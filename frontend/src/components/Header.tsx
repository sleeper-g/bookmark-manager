import { Button } from "@/components/ui/button"

const ADD_FORM_ID = "add-form"

export function Header() {
  const scrollToAddForm = () => {
    document.getElementById(ADD_FORM_ID)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between gap-4 px-4 sm:px-6">
        <h1 className="text-lg font-semibold tracking-tight text-foreground">
          Bookmark Manager
        </h1>
        <Button size="sm" onClick={scrollToAddForm}>
          Добавить закладку
        </Button>
      </div>
    </header>
  )
}

export { ADD_FORM_ID }
