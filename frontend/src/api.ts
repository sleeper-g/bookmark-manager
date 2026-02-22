import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000'
})

export interface Bookmark {
    id: number;
    title: string;
    url: string;
    description?: string,
    tags?: string 
}

export const getBookmarks = () => api.get<Bookmark[]>(`/bookmarks`).then(res => res.data);
export const deleteBookmark = (id: number) => api.delete(`/bookmarks/${id}`);