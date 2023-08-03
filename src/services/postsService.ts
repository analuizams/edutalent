import axios from "axios";
import IPost from "../types/post.type";
import INewPostRequest from "../types/newPost.type";

const API_BASE_URL = "https://jsonplaceholder.typicode.com/posts";

const getAll = () => {
  return axios.get<IPost[]>(API_BASE_URL);
};

const getById = (id: string) => {
  return axios.get<IPost>(`${API_BASE_URL}/${id}`);
};

const create = (data: INewPostRequest) => {
  return axios.post<IPost>(API_BASE_URL, data);
};

const update = (data: IPost, id: string) => {
  return axios.put<any>(`${API_BASE_URL}/${id}`, data);
};

const remove = (id: string) => {
  return axios.delete<any>(`${API_BASE_URL}/${id}`);
};

const PostDataService = {
  getAll,
  getById,
  create,
  update,
  remove,
};

export default PostDataService;
