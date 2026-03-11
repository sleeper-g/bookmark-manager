import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { AddBookmarkDialog } from "./components/AddBookmarkDialog"
import { BookmarkList } from "./components/BookmarkList"
import { Header } from "./components/Header"
import { SearchOverlay } from "./components/SearchOverlay"
import { BOOKMARKS_QUERY_KEY } from "./components/BookmarkList"

function App() {
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenSearchOverlay={() => setSearchOverlayOpen(true)}
        onOpenAddDialog={() => setAddDialogOpen(true)}
      />

      <SearchOverlay
        open={searchOverlayOpen}
        onOpenChange={setSearchOverlayOpen}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <AddBookmarkDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onBookmarkAdded={() =>
          queryClient.invalidateQueries({ queryKey: BOOKMARKS_QUERY_KEY })
        }
      />

      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            {searchQuery.trim() ? "Результаты поиска" : "Закладки"}
          </h2>
          <BookmarkList searchQuery={searchQuery.trim()} />
        </section>
      </main>
    </div>
  )
}

export default App