import { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { MoreVertical, ExternalLink, Pencil, Trash2 } from "lucide-react"
import type { Bookmark, BookmarkUpdate } from "@/api"

interface BookmarkCardProps {
  bookmark: Bookmark
  onDelete: (id: number) => void
  onUpdate: (id: number, data: BookmarkUpdate) => void
}

export function BookmarkCard({ bookmark, onDelete, onUpdate }: BookmarkCardProps) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editTitle, setEditTitle] = useState(bookmark.title)
  const [editUrl, setEditUrl] = useState(bookmark.url)
  const [editDescription, setEditDescription] = useState(bookmark.description ?? "")
  const [editTags, setEditTags] = useState(bookmark.tags ?? "")

  useEffect(() => {
    if (editOpen) {
      setEditTitle(bookmark.title)
      setEditUrl(bookmark.url)
      setEditDescription(bookmark.description ?? "")
      setEditTags(bookmark.tags ?? "")
    }
  }, [editOpen, bookmark])

  const handleConfirmDelete = () => {
    onDelete(bookmark.id)
    setDeleteOpen(false)
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(bookmark.id, {
      title: editTitle,
      url: editUrl,
      description: editDescription || undefined,
      tags: editTags || undefined,
    })
    setEditOpen(false)
  }

  return (
    <>
      <Card className="py-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {bookmark.title}
            </a>
          </CardTitle>
          <CardDescription className="line-clamp-1 text-sm">
            {bookmark.url}
          </CardDescription>
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Меню">
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="size-4" />
                    Открыть
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault()
                    setEditOpen(true)
                  }}
                >
                  <Pencil className="size-4" />
                  Редактировать
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={(e) => {
                    e.preventDefault()
                    setDeleteOpen(true)
                  }}
                >
                  <Trash2 className="size-4" />
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </CardHeader>
        {(bookmark.tags || bookmark.description) && (
          <CardContent className="pt-0 text-sm text-muted-foreground">
            {bookmark.tags && <span>{bookmark.tags}</span>}
            {bookmark.tags && bookmark.description && " · "}
            {bookmark.description}
          </CardContent>
        )}
      </Card>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать закладку</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveEdit} className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Название</label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">URL</label>
              <Input
                type="url"
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Описание</label>
              <Input
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Теги</label>
              <Input
                value={editTags}
                onChange={(e) => setEditTags(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>
                Отмена
              </Button>
              <Button type="submit">Сохранить</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить закладку?</AlertDialogTitle>
            <AlertDialogDescription>
              «{bookmark.title}» будет удалена без возможности восстановления.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
