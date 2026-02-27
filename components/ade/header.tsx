"use client"

import { Bot } from "lucide-react"

interface ADEHeaderProps {
  agentCount: number
  activeAgents: number
}

export function ADEHeader({ agentCount, activeAgents }: ADEHeaderProps) {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-muted">
          <Bot className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h1 className="font-mono text-sm font-bold tracking-tight text-foreground">
            ADE Fábrica
          </h1>
          <p className="font-mono text-[10px] text-muted-foreground">
            Assemblage & Deliverable Engine
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded border border-border bg-muted/50 px-3 py-1.5">
        <span className="font-mono text-[10px] font-medium text-muted-foreground">
          Agentes
        </span>
        <span className="font-mono text-xs font-semibold text-foreground">
          {activeAgents}/{agentCount}
        </span>
      </div>
    </header>
  )
}
