"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Play, Terminal, Shield, Cloud, Sparkles, Code2 } from "lucide-react";

interface CodeSnippet {
  id: string;
  name: string;
  lang: string;
  icon: typeof Code2;
  color: string;
  code: string;
  output: string;
}

const snippets: CodeSnippet[] = [
  {
    id: "web",
    name: "dev-hub.tsx",
    lang: "TypeScript",
    icon: Code2,
    color: "from-blue-500 to-cyan-400",
    code: `import { ITSACommunity } from "@itsa/core";

export default async function StudentHub() {
  const students = await ITSACommunity.connect({
    passion: "software-engineering",
    mode: "hands-on-building"
  });

  return <Launchpad members={students.count} active={true} />;
}`,
    output: "✓ Compiled successfully | 240+ active student builders connected",
  },
  {
    id: "sec",
    name: "ctf-audit.sh",
    lang: "Bash",
    icon: Shield,
    color: "from-emerald-500 to-teal-400",
    code: `#!/usr/bin/env bash
# ITSA CyberSec CTF Lab Initialization
echo "[+] Initializing sandbox environment..."
nmap -sV --script vuln 10.10.10.133
echo "[!] Exploit payload verified safely in isolated environment."`,
    output: "⚡ Security audit complete | Zero critical vulnerabilities in production",
  },
  {
    id: "cloud",
    name: "infra.tf",
    lang: "HCL",
    icon: Cloud,
    color: "from-amber-500 to-orange-400",
    code: `resource "aws_kubernetes_cluster" "itsa_prod" {
  name     = "itsa-student-cloud"
  role_arn = aws_iam_role.cluster.arn
  version  = "1.30"

  vpc_config { subnet_ids = aws_subnet.public[*].id }
}`,
    output: "☁ Kubernetes cluster deployed | 99.99% uptime across student apps",
  },
  {
    id: "ai",
    name: "agent-mesh.py",
    lang: "Python",
    icon: Sparkles,
    color: "from-purple-500 to-pink-400",
    code: `from itsa.ai import NeuralMesh

agent = NeuralMesh(model="gemini-3.6-flash")
dataset = agent.load_student_projects()

accuracy = agent.train(dataset, epochs=100)
print(f"Model deployed! Accuracy: {accuracy:.2%}")`,
    output: "🤖 AI Model initialized | 98.4% precision on automated code reviews",
  },
];

export function TerminalPreview() {
  const [activeId, setActiveId] = useState<string>("web");
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runLog, setRunLog] = useState<string | null>(null);

  const activeSnippet = snippets.find((s) => s.id === activeId) || snippets[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setRunLog(null);
    setTimeout(() => {
      setIsRunning(false);
      setRunLog(activeSnippet.output);
    }, 600);
  };

  return (
    <div className="group relative w-full overflow-hidden rounded-2xl border border-border/80 bg-slate-950/90 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
      {/* Glow highlight behind terminal */}
      <div className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-brand/20 via-transparent to-brand-orange/20 opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-75" />

      {/* Terminal Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-3">
        {/* Window controls */}
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-rose-500/80" />
          <span className="size-3 rounded-full bg-amber-500/80" />
          <span className="size-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-xs text-slate-400">itsa-terminal ~ zsh</span>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          LIVE LAB
        </div>
      </div>

      {/* Tabs bar */}
      <div className="flex overflow-x-auto border-b border-white/10 bg-slate-950/60 scrollbar-none">
        {snippets.map((snippet) => {
          const Icon = snippet.icon;
          const isActive = snippet.id === activeId;
          return (
            <button
              key={snippet.id}
              onClick={() => {
                setActiveId(snippet.id);
                setRunLog(null);
              }}
              className={`relative flex items-center gap-2 border-r border-white/5 px-4 py-2.5 text-xs font-medium transition-colors ${
                isActive
                  ? "bg-slate-900/90 text-white"
                  : "text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"
              }`}
            >
              <Icon className={`size-3.5 bg-gradient-to-r ${snippet.color} bg-clip-text text-transparent`} />
              <span>{snippet.name}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Code Editor Body */}
      <div className="relative min-h-[220px] p-4 font-mono text-xs leading-relaxed text-slate-200 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSnippet.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            <pre className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800">
              <code>
                {activeSnippet.code.split("\n").map((line, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="select-none text-slate-600">{idx + 1}</span>
                    <span className="flex-1">{formatCodeLine(line)}</span>
                  </div>
                ))}
              </code>
            </pre>
          </motion.div>
        </AnimatePresence>

        {/* Action bar inside terminal */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-brand/90 active:scale-95 disabled:opacity-50"
            >
              {isRunning ? (
                <Terminal className="size-3.5 animate-spin" />
              ) : (
                <Play className="size-3.5 fill-current" />
              )}
              {isRunning ? "Executing..." : "Run Snippet"}
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition-all hover:bg-slate-800 hover:text-white"
            >
              {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <span className="font-mono text-[11px] text-slate-500">
            {activeSnippet.lang}
          </span>
        </div>

        {/* Interactive Output Console */}
        <AnimatePresence>
          {(runLog || activeSnippet.output) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 rounded-lg border border-emerald-500/20 bg-emerald-950/30 p-3 font-mono text-[11px] text-emerald-300"
            >
              <div className="flex items-center gap-2 font-semibold text-emerald-400">
                <Terminal className="size-3.5" /> Output:
              </div>
              <p className="mt-1">{runLog || activeSnippet.output}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Simple syntax styling helper
function formatCodeLine(line: string) {
  if (line.trim().startsWith("//") || line.trim().startsWith("#")) {
    return <span className="text-slate-500 italic">{line}</span>;
  }
  if (line.includes("import ") || line.includes("export ") || line.includes("resource ") || line.includes("from ")) {
    return (
      <span className="text-purple-400 font-medium">
        {line.replace(/(import|export|default|function|async|await|resource|from|return|const|let|var)/g, (m) => m)}
      </span>
    );
  }
  return <span>{line}</span>;
}
