import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function signUp(body) {
  return axios.post(`${BASE_URL}/signup`, body);
}

function login(body) {
  return axios.post(`${BASE_URL}/login`, body);
}

function getUser(token) {
  const config = createConfig(token);
  return axios.get(`${BASE_URL}/transactions`, config);
}

export const services = { signUp, login, getUser };
