import { useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"

interface SearchOverlayProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  searchQuery: string
  onSearchChange: (value: string) => void
}

export function SearchOverlay({
  open,
  onOpenChange,
  searchQuery,
  onSearchChange,
}: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
      data-state={open ? "open" : "closed"}
      onClick={() => onOpenChange(false)}
    >
      <div
        className="mx-auto mt-4 max-w-2xl px-4 sm:mt-8 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-xl border border-border bg-card p-4 shadow-lg">
          <div className="flex items-center gap-2">
            <Search className="size-5 shrink-0 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="search"
              placeholder="Поиск по названию, URL, тегам…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="min-h-11 flex-1 border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              aria-label="Закрыть"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
