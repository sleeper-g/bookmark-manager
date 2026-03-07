import { AddBookmarkForm } from "./components/addBookmarkForm"
import { Header, ADD_FORM_ID } from "./components/Header"

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
        <section id={ADD_FORM_ID} className="scroll-mt-6">
          <AddBookmarkForm onBookmarkAdded={() => {}} />
        </section>
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-medium text-foreground">Закладки</h2>
          <p className="text-sm text-muted-foreground">
            Список закладок будет здесь.
          </p>
        </section>
      </main>
    </div>
  )
}

export default App