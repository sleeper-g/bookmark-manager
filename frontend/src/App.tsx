import { AddBookmarkForm } from "./components/addBookmarkForm"
import { Button } from "./components/ui/button"

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Bookmark Manager
          </h1>
          <p className="mt-1 text-muted-foreground">
            Добавляйте и храните закладки в одном месте.
          </p>
        </header>

        <AddBookmarkForm onBookmarkAdded={() => {}} />

        <section className="mt-8">
          <h2 className="mb-3 text-lg font-medium text-foreground">Закладки</h2>
          <p className="text-sm text-muted-foreground">
            Список закладок будет здесь.
          </p>
          <div className="mt-4 flex gap-2">
            <Button>Пример кнопки</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App