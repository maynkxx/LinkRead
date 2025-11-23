import api from "./axios";

export const createPost = (formData) =>
  api.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getPost = (postId) =>
  api.get(`/posts/${postId}`);

export const getPostsByThread = (threadId) =>
  api.get(`/posts/thread/${threadId}`);

export const deletePost = (postId) =>
  api.delete(`/posts/${postId}`);

export const votePost = (postId, value) =>
  api.post(`/posts/${postId}/vote`, { value });

export const savePost = (postId) =>
  api.post(`/posts/${postId}/save`);

export const unsavePost = (postId) =>
  api.post(`/posts/${postId}/unsave`);
