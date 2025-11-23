import api from "./axios";

export const getUserProfile = (userId) =>
  api.get(`/users/${userId}`);

export const searchUsers = (query) =>
  api.get(`/users/search/query?q=${query}`);

export const updateUserProfile = (formData) =>
  api.put("/users/update/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteUserAccount = () =>
  api.delete("/users/delete/account");

export const followUser = (userId) =>
  api.post(`/users/follow/${userId}`);

export const unfollowUser = (userId) =>
  api.post(`/users/unfollow/${userId}`);

export const getSavedPosts = () =>
  api.get("/users/saved/posts/list");

export const getUserPosts = (userId) =>
  api.get(`/users/posts/list/${userId}`);

export const getUserComments = (userId) =>
  api.get(`/users/comments/list/${userId}`);
