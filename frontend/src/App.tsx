import { useEffect, useState } from 'react'
import { getBookmarks, deleteBookmark } from './api'
import type { Bookmark } from './api'
import { ExternalLink, Trash2, Bookmark as BookmarkIcon } from 'lucide-react'
import { AddBookmarkForm } from './addBookmarkForm'

function App() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  const load = async () => {
    const data = await getBookmarks()
    setBookmarks(data)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: number) => {
    await deleteBookmark(id)
    load() // Перезагружаем список
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <BookmarkIcon className="text-blue-600" /> My Bookmarks
          </h1>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Total: {bookmarks.length}
          </span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((b) => (
            <div key={b.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg text-gray-900 mb-2 truncate" title={b.title}>
                {b.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">
                {b.description || "No description provided."}
              </p>
              <div className="flex justify-between items-center">
                <a 
                  href={b.url} 
                  target="_blank" 
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
                >
                  Visit <ExternalLink size={14} />
                </a>
                <button 
                  onClick={() => handleDelete(b.id)}
                  className="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddBookmarkForm/>
    </div>
  )
}

export default App