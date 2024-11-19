import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const startFlow = async () => {
  const response = await axios.post(`${API_URL}/flow/start`);
  return response.data;
};

export const updateFlow = async (id, status, log) => {
  const response = await axios.put(`${API_URL}/flow/${id}`, { status, log });
  return response.data;
};

export const getFlow = async (id) => {
  const response = await axios.get(`${API_URL}/flow/${id}`);
  return response.data;
};