import axios from 'axios';
const baseUrl = 'http://localhost:3002/persons'; // Убедитесь, что здесь правильный URL
const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then(response => response.data);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data);
};

// Добавляем функцию remove
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data);
};

// Экспортируем все функции
export default {
  getAll,
  create,
  update,
  remove,  }
