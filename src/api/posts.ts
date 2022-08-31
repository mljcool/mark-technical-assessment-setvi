import axios from 'axios';
import { IPost } from 'types/Post';

export const SERVICE_API = 'https://jsonplaceholder.typicode.com';
// SKIP GENERIC FOR NOW

export const getPostList = async (id?: number | string) =>
  axios.get(`${SERVICE_API}/posts`, {
    params: {
      id,
    },
  });

export const addPost = async (dataParams: IPost) => {
  const data = JSON.stringify(dataParams);
  const resp = await axios.post(`${SERVICE_API}/posts`, data, {
    headers: { 'Content-Type': 'application/json' },
  });
  return resp;
};

export const deletePost = async (id?: number | string) =>
  axios.delete(`${SERVICE_API}/posts/${id}`);
