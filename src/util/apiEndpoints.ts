// Use Vite dev proxy to avoid CORS in development
export const BASE_URL = 'http://localhost:8080/api/v1.0';
export const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  GET_USER_INFO: "/profile",
  GET_TODOS: "/todos",
  ADD_TODO: "/todos",
  UPDATE_TODO: (id: string | number) => `/todos/${id}`,
  DELETE_TODO: (id: string | number) => `/todos/${id}`,
  UPDATE_STATUS: (id: string | number) => `/todos/${id}/status`,
  START_TODO: (id: string | number) => `/todos/${id}/start`,
  COMPLETE_TODO: (id: string | number) => `/todos/${id}/complete`,
  REOPEN_TODO: (id: string | number) => `/todos/${id}/reopen`,
  TOGGLE_FAVORITE: (id: string | number) => `/todos/${id}/favorite`,
  GET_FAVORITES: "/todos/favorites",
  SEARCH_TODOS: "/todos/search",
};

export default API_ENDPOINTS;