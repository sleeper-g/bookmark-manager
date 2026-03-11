import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"

interface HeaderProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  onOpenSearchOverlay?: () => void
  onOpenAddDialog: () => void
}

export function Header({
  searchQuery,
  onSearchChange,
  onOpenSearchOverlay,
  onOpenAddDialog,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-4xl items-center gap-3 px-4 sm:gap-4 sm:px-6">
        <h1 className="shrink-0 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Bookmark Manager
        </h1>

        {/* Поиск: на мобильном — иконка (открывает overlay), на десктопе — поле в карточке */}
        <div className="hidden flex-1 min-w-0 sm:block">
          <div className="relative rounded-lg border border-border bg-card shadow-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Поиск по названию, URL, тегам…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-10 border-0 bg-transparent pl-9 pr-3 shadow-none focus-visible:ring-0"
            />
          </div>
        </div>
        {onOpenSearchOverlay && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="shrink-0 sm:hidden"
            onClick={onOpenSearchOverlay}
            aria-label="Поиск"
          >
            <Search className="size-5" />
          </Button>
        )}

        <Button
          size="default"
          onClick={onOpenAddDialog}
          className="shrink-0 gap-2"
        >
          <Plus className="size-4" />
          <span className="hidden xs:inline sm:inline">Добавить</span>
        </Button>
      </div>
    </header>
  )
}
