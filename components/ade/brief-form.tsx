"use client"

import { Send, FileText } from "lucide-react"

interface BriefFormProps {
  objetivo: string
  contexto: string
  onObjetivoChange: (v: string) => void
  onContextoChange: (v: string) => void
  onSubmit: () => void
  isProcessing: boolean
}

export function BriefForm({
  objetivo,
  contexto,
  onObjetivoChange,
  onContextoChange,
  onSubmit,
  isProcessing,
}: BriefFormProps) {
  return (
    <div className="flex h-full flex-col border-r border-border bg-background p-4">
      <div className="mb-4 flex items-center gap-2">
        <FileText className="h-4 w-4 text-primary" />
        <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
          Brief de Entrada
        </h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
        className="flex flex-1 flex-col gap-4"
      >
        <div>
          <label
            htmlFor="topic"
            className="mb-1.5 block font-mono text-[10px] font-medium text-muted-foreground"
          >
            Tema / Objetivo
          </label>
          <input
            id="topic"
            type="text"
            value={objetivo}
            onChange={(e) => onObjetivoChange(e.target.value)}
            placeholder="Ej: Plan de expansión para un producto B2B"
            className="w-full rounded border border-input bg-background px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isProcessing}
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="context"
            className="mb-1.5 block font-mono text-[10px] font-medium text-muted-foreground"
          >
            Contexto / Fuentes
          </label>
          <textarea
            id="context"
            value={contexto}
            onChange={(e) => onContextoChange(e.target.value)}
            placeholder="Describa el contexto, fuentes clave, restricciones..."
            rows={8}
            className="w-full resize-none rounded border border-input bg-background px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isProcessing}
          />
        </div>
        <button
          type="submit"
          disabled={isProcessing}
          className="inline-flex w-full items-center justify-center gap-2 rounded border border-primary bg-primary px-4 py-2.5 font-mono text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-3.5 w-3.5" />
          {isProcessing ? "Procesando..." : "Iniciar Pipeline"}
        </button>
      </form>
    </div>
  )
}
