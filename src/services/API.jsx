const BASE_URL = "https://jsonplaceholder.typicode.com";

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export const getUsers    = () => request("/users");
export const getUser     = (id) => request(`/users/${id}`);
export const getPosts    = () => request("/posts");
export const getPost     = (id) => request(`/posts/${id}`);
export const getComments = () => request("/comments");
export const getTodos    = () => request("/todos?_limit=10");