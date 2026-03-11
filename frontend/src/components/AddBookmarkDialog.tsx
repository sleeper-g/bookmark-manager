import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AddBookmarkForm } from "./addBookmarkForm"

interface AddBookmarkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBookmarkAdded: () => void
}

export function AddBookmarkDialog({
  open,
  onOpenChange,
  onBookmarkAdded,
}: AddBookmarkDialogProps) {
  const handleAdded = () => {
    onBookmarkAdded()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Добавить закладку</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <AddBookmarkForm onBookmarkAdded={handleAdded} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
