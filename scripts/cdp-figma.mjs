import { spawn } from 'child_process';
import fs from 'fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const url = 'https://www.figma.com/design/tCFjjwkzMJ3uXTdiAUdiXe/Untitled?node-id=3-91';

  console.log('Spawning Chrome...');
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
    if (!tab) throw new Error('No page tab found');

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
    await send('Input.enable');

    console.log('Waiting 10s for Figma to load...');
    await new Promise(r => setTimeout(r, 10000));

    // Check if figma global exists
    const figmaGlobal = await send('Runtime.evaluate', {
      expression: `
        (() => {
          return {
            hasFigma: typeof figma !== 'undefined',
            keys: Object.keys(window).filter(k => k.toLowerCase().includes('figma')),
            title: document.title
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Figma global check:', figmaGlobal);

    // Click on canvas center (x: 1000, y: 500) and press Shift+1 (Zoom to Fit)
    await send('Input.dispatchMouseEvent', {
      type: 'mousePressed',
      x: 1000,
      y: 500,
      button: 'left',
      clickCount: 1
    });
    await send('Input.dispatchMouseEvent', {
      type: 'mouseReleased',
      x: 1000,
      y: 500,
      button: 'left',
      clickCount: 1
    });

    // Send Shift+1
    await send('Input.dispatchKeyEvent', {
      type: 'keyDown',
      modifiers: 8, // Shift
      windowsVirtualKeyCode: 49, // 1
      code: 'Digit1',
      key: '!'
    });
    await send('Input.dispatchKeyEvent', {
      type: 'keyUp',
      modifiers: 0,
      windowsVirtualKeyCode: 49,
      code: 'Digit1',
      key: '!'
    });

    await new Promise(r => setTimeout(r, 3000));

    // Capture screenshot after zoom to fit
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    if (shot && shot.data) {
      fs.writeFileSync('C:/Users/User/.gemini/antigravity-ide/brain/437f305a-d377-4d02-8871-3ebe45c5da51/scratch/figma_zoom_fit.png', Buffer.from(shot.data, 'base64'));
      console.log('Saved figma_zoom_fit.png');
    }

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    chrome.kill();
  }
}

main();
