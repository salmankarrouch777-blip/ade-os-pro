"use client"

import { Check, Loader2, Circle } from "lucide-react"

export interface PipelineStep {
  id: number
  label: string
  status: "pending" | "active" | "done"
}

export const defaultSteps: PipelineStep[] = [
  { id: 1, label: "T0 Intake", status: "pending" },
  { id: 2, label: "T1 Processing", status: "pending" },
  { id: 3, label: "T2 Assembly", status: "pending" },
  { id: 4, label: "T3 Output", status: "pending" },
]

interface ProcessingPipelineProps {
  steps: PipelineStep[]
  visible: boolean
}

export function ProcessingPipeline({ steps, visible }: ProcessingPipelineProps) {
  if (!visible) return null

  return (
    <div className="shrink-0 border-b border-border px-6 py-2">
      <div className="flex items-center gap-1">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-1">
            <div
              className={`flex items-center gap-1.5 rounded px-2 py-0.5 font-mono text-[9px] font-semibold transition-colors ${
                step.status === "done"
                  ? "bg-primary/10 text-primary"
                  : step.status === "active"
                    ? "bg-primary/5 text-primary"
                    : "bg-muted/50 text-muted-foreground"
              }`}
            >
              {step.status === "done" ? (
                <Check className="h-2.5 w-2.5" />
              ) : step.status === "active" ? (
                <Loader2 className="h-2.5 w-2.5 animate-spin" />
              ) : (
                <Circle className="h-2 w-2" />
              )}
              {step.label}
            </div>
            {i < steps.length - 1 && (
              <div className="h-px w-4 bg-border" aria-hidden />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
