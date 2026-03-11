import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getBookmarks,
  searchBookmarks,
  deleteBookmark,
  updateBookmark,
  type BookmarkUpdate,
} from "@/api"
import { BookmarkCard } from "./BookmarkCard"
import { BookmarkRow } from "./BookmarkRow"
import { Button } from "@/components/ui/button"
import { LayoutGrid, List } from "lucide-react"

const BOOKMARKS_QUERY_KEY = ["bookmarks"] as const
const PAGE_SIZE = 24

type ViewMode = "grid" | "list"

interface BookmarkListProps {
  searchQuery?: string
}

export function BookmarkList({ searchQuery = "" }: BookmarkListProps) {
  const queryClient = useQueryClient()
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [searchQuery])

  const { data: bookmarks = [], isLoading, isError, error } = useQuery({
    queryKey: [...BOOKMARKS_QUERY_KEY, searchQuery],
    queryFn: searchQuery
      ? () => searchBookmarks(searchQuery)
      : getBookmarks,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKMARKS_QUERY_KEY })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: BookmarkUpdate }) =>
      updateBookmark(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKMARKS_QUERY_KEY })
    },
  })

  const visible = bookmarks.slice(0, visibleCount)
  const hasMore = bookmarks.length > visibleCount
  const showLoadMore = !searchQuery && hasMore

  if (isLoading) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Загрузка закладок…
      </p>
    )
  }

  if (isError) {
    return (
      <p className="py-8 text-center text-sm text-destructive">
        Ошибка: {error instanceof Error ? error.message : "Не удалось загрузить"}
      </p>
    )
  }

  if (bookmarks.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        {searchQuery
          ? "По запросу ничего не найдено."
          : "Пока нет закладок. Нажмите «Добавить» в шапке."}
      </p>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm text-muted-foreground">
          {searchQuery
            ? `Найдено: ${bookmarks.length}`
            : `Показано ${visible.length} из ${bookmarks.length}`}
        </span>
        <div className="flex items-center gap-1 rounded-md border border-border p-0.5">
          <Button
            type="button"
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setViewMode("grid")}
            aria-label="Плитки"
          >
            <LayoutGrid className="size-4" />
          </Button>
          <Button
            type="button"
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setViewMode("list")}
            aria-label="Список"
          >
            <List className="size-4" />
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {visible.map((bookmark) => (
            <li key={bookmark.id}>
              <BookmarkCard
                bookmark={bookmark}
                onDelete={(id) => deleteMutation.mutate(id)}
                onUpdate={(id, data) => updateMutation.mutate({ id, data })}
              />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col gap-2">
          {visible.map((bookmark) => (
            <li key={bookmark.id}>
              <BookmarkRow
                bookmark={bookmark}
                onDelete={(id) => deleteMutation.mutate(id)}
                onUpdate={(id, data) => updateMutation.mutate({ id, data })}
              />
            </li>
          ))}
        </ul>
      )}

      {showLoadMore && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          >
            Показать ещё
          </Button>
        </div>
      )}
    </div>
  )
}

export { BOOKMARKS_QUERY_KEY }
