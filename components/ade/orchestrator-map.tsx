"use client"

import { Bot, Check, Loader2, Clock } from "lucide-react"

export interface AgentNode {
  id: string
  label: string
  status: "idle" | "active" | "waiting" | "done"
  metrics?: { label: string; value: string }
}

export const defaultAgents: AgentNode[] = [
  { id: "intake-parser", label: "Parser", status: "idle" },
  { id: "web-crawler", label: "Crawler", status: "idle" },
  { id: "deep-reader", label: "Reader", status: "idle" },
  { id: "reasoning-engine", label: "Reasoning", status: "idle" },
  { id: "source-validator", label: "Validator", status: "idle" },
  { id: "synthesizer", label: "Synthesizer", status: "idle" },
  { id: "deliverable-builder", label: "Builder", status: "idle" },
]

function AgentIcon({ status }: { status: AgentNode["status"] }) {
  if (status === "done") return <Check className="h-3 w-3" />
  if (status === "active") return <Loader2 className="h-3 w-3 animate-spin" />
  if (status === "waiting") return <Clock className="h-3 w-3" />
  return <Bot className="h-3 w-3 opacity-50" />
}

interface OrchestratorMapProps {
  agents: AgentNode[]
  visible: boolean
}

export function OrchestratorMap({ agents, visible }: OrchestratorMapProps) {
  if (!visible) return null

  return (
    <div className="shrink-0 border-b border-border px-6 py-3">
      <div className="flex flex-wrap gap-2">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className={`flex items-center gap-2 rounded border px-2.5 py-1.5 font-mono text-[9px] transition-colors ${
              agent.status === "done"
                ? "border-primary/30 bg-primary/5 text-primary"
                : agent.status === "active"
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : agent.status === "waiting"
                    ? "border-border bg-muted/30 text-muted-foreground"
                    : "border-border bg-muted/10 text-muted-foreground"
            }`}
          >
            <AgentIcon status={agent.status} />
            <span className="font-semibold">{agent.label}</span>
            {agent.metrics && (
              <span className="text-muted-foreground">
                {agent.metrics.label}: {agent.metrics.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
