"use client"

import { useState } from "react"
import {
  Check,
  Copy,
  FileOutput,
  Loader2,
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

interface AssetAreaProps {
  isProcessing: boolean
  isComplete: boolean
  content: string | null
}

export function AssetArea({
  isProcessing,
  isComplete,
  content,
}: AssetAreaProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!content) return
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // opcional: manejar error de copia
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden p-6">
      {!isProcessing && !content && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-muted/20">
          <FileOutput className="h-12 w-12 text-muted-foreground" />
          <p className="font-mono text-sm text-muted-foreground">
            Esperando Brief de entrada...
          </p>
        </div>
      )}

      {isProcessing && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
          <p className="font-mono text-sm text-emerald-300 animate-pulse text-center">
            Ensamblando activo estratégico... Rastreando fuentes en tiempo real
          </p>
        </div>
      )}

      {isComplete && content && (
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="mb-3 flex items-center justify-end">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-mono text-emerald-200 transition-colors hover:bg-emerald-500/20"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-emerald-300" />
              )}
              <span>{copied ? "Informe copiado" : "Copiar Informe"}</span>
            </button>
          </div>

          <div className="flex-1 overflow-auto rounded-lg border border-border bg-background p-6">
            <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white prose-headings:font-semibold prose-strong:text-white prose-ul:text-gray-300 prose-li:marker:text-gray-500">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Enlaces: mantenemos la config actual
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 transition-colors hover:text-emerald-300 no-underline hover:underline"
                    >
                      {children}
                    </a>
                  ),
                  // Razonamiento (blockquote)
                  blockquote: ({ children, ...props }) => (
                    <blockquote
                      className="border-l-4 border-indigo-500 bg-indigo-900/20 p-5 rounded-r-xl text-indigo-200 my-8 font-mono text-sm shadow-[inset_0_0_20px_rgba(99,102,241,0.1)] relative overflow-hidden"
                      {...props}
                    >
                      <div className="flex items-center gap-2 mb-2 text-indigo-400 font-bold uppercase tracking-wider text-xs">
                        <Info className="w-4 h-4" /> RAZONAMIENTO DEL MOTOR
                      </div>
                      {children}
                    </blockquote>
                  ),
                  // Gráficas (code con language-json_chart)
                  code: ({
                    node,
                    inline,
                    className,
                    children,
                    ...props
                  }: any) => {
                    const match = /language-(\w+)/.exec(className || "")
                    const isJsonChart = match && match[1] === "json_chart"

                    if (!inline && isJsonChart) {
                      try {
                        const parsedData = JSON.parse(
                          String(children).replace(/\n$/, "")
                        )
                        return (
                          <div className="bg-[#121214] border border-zinc-800 rounded-xl p-6 my-8 w-full h-[320px] shadow-2xl relative overflow-hidden not-prose">
                            <h4 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-6">
                              📊 Visualización de Datos
                            </h4>
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={parsedData}
                                margin={{
                                  top: 0,
                                  right: 0,
                                  bottom: 20,
                                  left: -20,
                                }}
                              >
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  stroke="#27272a"
                                  vertical={false}
                                />
                                <XAxis
                                  dataKey="name"
                                  stroke="#888"
                                  fontSize={12}
                                  tickLine={false}
                                  axisLine={false}
                                  dy={10}
                                />
                                <YAxis
                                  stroke="#888"
                                  fontSize={12}
                                  tickLine={false}
                                  axisLine={false}
                                />
                                <Tooltip
                                  contentStyle={{
                                    backgroundColor: "#18181b",
                                    borderColor: "#27272a",
                                    color: "#fff",
                                    borderRadius: "8px",
                                  }}
                                  itemStyle={{
                                    color: "#10b981",
                                    fontWeight: "bold",
                                  }}
                                  cursor={{
                                    fill: "#27272a",
                                    opacity: 0.5,
                                  }}
                                />
                                <Bar
                                  dataKey="value"
                                  fill="#10b981"
                                  radius={[4, 4, 0, 0]}
                                  maxBarSize={50}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        )
                      } catch (e) {
                        return (
                          <div className="text-red-400 p-4 border border-red-900/50 bg-red-900/10 rounded-xl">
                            Error cargando gráfica JSON
                          </div>
                        )
                      }
                    }

                    return !inline ? (
                      <pre className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl overflow-x-auto my-6 text-sm">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    ) : (
                      <code
                        className="bg-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm font-mono"
                        {...props}
                      >
                        {children}
                      </code>
                    )
                  },
                  // Veredictos (strong)
                  strong: ({ children, ...props }: any) => {
                    const text = String(children)
                    if (text.includes("RECOMENDADO")) {
                      return (
                        <span className="bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full border border-emerald-500/30 font-bold tracking-widest text-xs uppercase shadow-[0_0_15px_rgba(16,185,129,0.15)] inline-flex items-center gap-2 my-2">
                          <CheckCircle2 className="w-4 h-4" />
                          {children}
                        </span>
                      )
                    }
                    if (
                      text.includes("PRECAUCIÓN") ||
                      text.includes("PRECAUCION")
                    ) {
                      return (
                        <span className="bg-amber-500/10 text-amber-400 px-4 py-1.5 rounded-full border border-amber-500/30 font-bold tracking-widest text-xs uppercase shadow-[0_0_15px_rgba(245,158,11,0.15)] inline-flex items-center gap-2 my-2">
                          <AlertTriangle className="w-4 h-4" />
                          {children}
                        </span>
                      )
                    }
                    if (text.includes("DESCARTADO")) {
                      return (
                        <span className="bg-rose-500/10 text-rose-400 px-4 py-1.5 rounded-full border border-rose-500/30 font-bold tracking-widest text-xs uppercase shadow-[0_0_15px_rgba(244,63,94,0.15)] inline-flex items-center gap-2 my-2">
                          <XCircle className="w-4 h-4" />
                          {children}
                        </span>
                      )
                    }
                    return (
                      <strong className="text-white font-semibold" {...props}>
                        {children}
                      </strong>
                    )
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}

      {isComplete && !content && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <FileOutput className="h-12 w-12 text-muted-foreground" />
          <p className="font-mono text-sm text-muted-foreground">
            Sin contenido generado
          </p>
        </div>
      )}
    </div>
  )
}
