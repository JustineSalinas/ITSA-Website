import { spawn } from 'child_process';
import fs from 'fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const url = 'https://www.figma.com/design/tCFjjwkzMJ3uXTdiAUdiXe/Untitled?node-id=3-91';

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--window-size=2560,1440',
    url
  ]);

  await new Promise(r => setTimeout(r, 3000));

  try {
    const listRes = await fetch('http://127.0.0.1:9222/json');
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.type === 'page');

    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise((res, rej) => {
      ws.onopen = res;
      ws.onerror = rej;
    });

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        const handler = (evt) => {
          const data = JSON.parse(evt.data);
          if (data.id === id) {
            ws.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');

    console.log('Waiting 10s for Figma canvas to initialize...');
    await new Promise(r => setTimeout(r, 10000));

    // Inspect figma object
    const evalNodes = await send('Runtime.evaluate', {
      expression: `
        (async () => {
          try {
            if (typeof figma === 'undefined') return { error: 'No figma global' };
            const page = figma.currentPage;
            const nodes = page.children.map(n => ({
              id: n.id,
              name: n.name,
              type: n.type,
              width: n.width,
              height: n.height,
              childrenCount: n.children ? n.children.length : 0
            }));
            return { nodes };
          } catch(e) {
            return { error: e.message, stack: e.stack };
          }
        })()
      `,
      awaitPromise: true,
      returnByValue: true
    });
    console.log('Figma nodes inspection:', JSON.stringify(evalNodes, null, 2));

    // Now export each vectorized node as SVG and PNG
    const exportResult = await send('Runtime.evaluate', {
      expression: `
        (async () => {
          try {
            const page = figma.currentPage;
            const results = {};
            for (const child of page.children) {
              // Export SVG
              try {
                const svgBytes = await child.exportAsync({ format: 'SVG' });
                const svgString = new TextDecoder().decode(svgBytes);
                // Also export PNG 4x
                const pngBytes = await child.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 4 } });
                let binary = '';
                const bytes = new Uint8Array(pngBytes);
                for (let i = 0; i < bytes.byteLength; i++) {
                  binary += String.fromCharCode(bytes[i]);
                }
                const pngBase64 = btoa(binary);

                results[child.name] = {
                  id: child.id,
                  svg: svgString,
                  pngBase64: pngBase64
                };
              } catch(err) {
                results[child.name] = { error: err.message };
              }
            }
            return results;
          } catch(e) {
            return { error: e.message };
          }
        })()
      `,
      awaitPromise: true,
      returnByValue: true
    });

    if (exportResult && exportResult.result && exportResult.result.value) {
      const data = exportResult.result.value;
      for (const [name, val] of Object.entries(data)) {
        console.log('Exported node:', name, val.error ? `Error: ${val.error}` : 'Success!');
        if (val.svg) {
          const safeName = name.replace(/[^a-zA-Z0-9_-]/g, '_');
          fs.writeFileSync(`c:/Users/User/ITSA-Website/public/${safeName}.svg`, val.svg);
          console.log(`Saved c:/Users/User/ITSA-Website/public/${safeName}.svg (${val.svg.length} bytes)`);
        }
        if (val.pngBase64) {
          const safeName = name.replace(/[^a-zA-Z0-9_-]/g, '_');
          fs.writeFileSync(`c:/Users/User/ITSA-Website/public/${safeName}.png`, Buffer.from(val.pngBase64, 'base64'));
          console.log(`Saved c:/Users/User/ITSA-Website/public/${safeName}.png`);
        }
      }
    }

    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    chrome.kill();
  }
}

main();
