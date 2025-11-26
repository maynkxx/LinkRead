import api from "./axios";

export const addComment = (data) =>
  api.post("/comments", data);

export const getPostComments = (postId) =>
  api.get(`/comments/post/${postId}`);

export const deleteComment = (commentId) =>
  api.delete(`/comments/${commentId}`);

export const voteComment = (commentId, value) =>
  api.post(`/comments/${commentId}/vote`, { value });
