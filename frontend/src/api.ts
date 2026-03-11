import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE ?? "http://127.0.0.1:8000",
})

export interface Bookmark {
  id: number
  title: string
  url: string
  description?: string
  tags?: string
  created_at?: string
}

export const getBookmarks = () =>
  api.get<Bookmark[]>(`/bookmarks`).then((res) => res.data)

export type BookmarkCreate = Pick<Bookmark, "title" | "url"> &
  Partial<Pick<Bookmark, "description" | "tags">>

export const createBookmark = (data: BookmarkCreate) =>
  api.post(`/bookmark`, data)

export const searchBookmarks = (query: string) =>
  api.get<Bookmark[]>(`/search`, { params: { query } }).then((res) => res.data)

export const deleteBookmark = (id: number) =>
  api.delete(`/bookmarks/${id}`)

export type BookmarkUpdate = Pick<Bookmark, "title" | "url"> &
  Partial<Pick<Bookmark, "description" | "tags">>

export const updateBookmark = (id: number, data: BookmarkUpdate) =>
  api.put(`/bookmarks/${id}`, data)