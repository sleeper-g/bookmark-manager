import { useState } from 'react';

export function AddBookmarkForm({ onBookmarkAdded }: { onBookmarkAdded: () => void }) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, title, description: '', tags: '' }),
      });

      if (response.ok) {
        setUrl('');
        setTitle('');
        onBookmarkAdded(); // Обновляем список после добавления
      }
    } catch (error) {
      console.error("Ошибка при добавлении:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg mb-6 border border-slate-200">
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Название (например, Google)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:bg-blue-300"
        >
          {loading ? 'Добавление...' : 'Добавить закладку'}
        </button>
      </div>
    </form>
  );
}
export default AddBookmarkForm;