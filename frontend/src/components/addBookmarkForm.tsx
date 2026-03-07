import { useState } from "react"
import { Button } from "@/components/ui/button"

export function AddBookmarkForm({
  onBookmarkAdded,
}: {
  onBookmarkAdded: () => void
}) {
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch("http://127.0.0.1:8000/bookmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, title, description: "", tags: "" }),
      })
      if (response.ok) {
        setUrl("")
        setTitle("")
        onBookmarkAdded()
      }
    } catch (error) {
      console.error("Ошибка при добавлении:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-card p-5 shadow-sm"
    >
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Название (например, Google)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-3 py-1 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          required
        />
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-3 py-1 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          required
        />
        <Button type="submit" disabled={loading} size="default">
          {loading ? "Добавление…" : "Добавить закладку"}
        </Button>
      </div>
    </form>
  )
}
export default AddBookmarkForm