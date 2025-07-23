import api from "../config/api";

// Author API
export const authorAPI = {
  getAll: () => api.get("/authors"),
  getById: (id) => api.get(`/authors/${id}`),
  create: (data) => api.post("/authors", data),
  update: (id, data) => api.put(`/authors/${id}`, data),
  delete: (id) => api.delete(`/authors/${id}`),
};

// Publisher API
export const publisherAPI = {
  getAll: () => api.get("/publishers"),
  getById: (id) => api.get(`/publishers/${id}`),
  create: (data) => api.post("/publishers", data),
  update: (id, data) => api.put(`/publishers/${id}`, data),
  delete: (id) => api.delete(`/publishers/${id}`),
};

// Category API
export const categoryAPI = {
  getAll: () => api.get("/categories"),
  getById: (id) => api.get(`/categories/${id}`),
  create: (data) => api.post("/categories", data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
};

// Book API
export const bookAPI = {
  getAll: () => api.get("/books"),
  getById: (id) => api.get(`/books/${id}`),
  create: (data) => api.post("/books", data),
  update: (id, data) => api.put(`/books/${id}`, data),
  delete: (id) => api.delete(`/books/${id}`),
};

// Book Borrowing API
export const borrowingAPI = {
  getAll: () => api.get("/borrows"),
  getById: (id) => api.get(`/borrows/${id}`),
  create: (data) => api.post("/borrows", data),
  update: (id, data) => api.put(`/borrows/${id}`, data),
  delete: (id) => api.delete(`/borrows/${id}`),
};
