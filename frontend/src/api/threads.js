import api from "./axios";

export const getThread = (slug) =>
  api.get(`/threads/${slug}`);

export const createThread = (data) =>
  api.post("/threads", data);

export const joinThread = (threadId) =>
  api.post(`/threads/join/${threadId}`);

export const leaveThread = (threadId) =>
  api.post(`/threads/leave/${threadId}`);

export const getTrendingThreads = () =>
  api.get("/threads/trending");

export const getAllThreads = () =>
  api.get("/threads");
