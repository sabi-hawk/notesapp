import API from "./index";

export const fetchNotes = () => API.get("/notes");

export const fetchNote = (noteId) => API.get(`/notes/${noteId}`);

export const createNote = (notesData) => API.post("/notes", notesData);

export const updateNote = (noteId, note) => API.put(`/notes/${noteId}`, note);

export const deleteNote = (noteId) => API.delete(`/notes/${noteId}`);
