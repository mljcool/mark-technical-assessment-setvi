import axios from 'axios';

export const SERVICE_API = 'https://jsonplaceholder.typicode.com';
// SKIP GENERIC FOR NOW

export const getPostList = async (userId?: number) =>
  axios.get(`${SERVICE_API}/posts`, {
    params: {
      userId,
    },
  });

export const getPostDetail = (id: number) =>
  axios.get(`${SERVICE_API}/posts/${id}`);
