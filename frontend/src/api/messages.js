import api from "./axios";

export const sendMessage = (data) =>
  api.post("/messages/send", data);

export const getMessageThread = (otherUserId) =>
  api.get(`/messages/thread/${otherUserId}`);

export const getInbox = () =>
  api.get("/messages/inbox");

export const markMessageRead = (id) =>
  api.post(`/messages/${id}/read`);
