import { useState } from "react"
import { Button } from "@/components/ui/button"
import { createBookmark } from "@/api"

export function AddBookmarkForm({
  onBookmarkAdded,
}: {
  onBookmarkAdded: () => void
}) {
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createBookmark({
        title,
        url,
        description: description || undefined,
        tags: tags || undefined,
      })
      setUrl("")
      setTitle("")
      setDescription("")
      setTags("")
      onBookmarkAdded()
    } catch (error) {
      console.error("Ошибка при добавлении:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <input
          type="text"
          placeholder="Описание (необязательно)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-3 py-1 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="text"
          placeholder="Теги через запятую (необязательно)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-3 py-1 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <Button type="submit" disabled={loading} size="default">
          {loading ? "Добавление…" : "Добавить закладку"}
        </Button>
      </div>
    </form>
  )
}
export default AddBookmarkForm