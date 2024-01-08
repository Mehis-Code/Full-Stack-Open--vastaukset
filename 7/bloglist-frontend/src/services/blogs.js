import axios from "axios";
import storageService from "./storage";
const baseUrl = "http://localhost:3003/api/blogs";

const headers = {
  Authorization: storageService.loadUser()
    ? `Bearer ${storageService.loadUser().token}`
    : null,
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  console.log(request.data);
  return request.data;
};

const create = async (object) => {
  const request = await axios.post(baseUrl, object, { headers });
  console.log(request.data);
  return request.data;
};

const update = async (object) => {
  const request = await axios.put(`${baseUrl}/${object.id}`, object, {
    headers,
  });
  return request.data;
};

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { headers });
};

export default { getAll, create, update, remove };
