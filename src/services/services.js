import axios from 'axios';

const BASE_URL = 'http://localhost:5000';
function signUp(body) {
  return axios.post(`${BASE_URL}/signup`, body);
}

function login(body) {
  return axios.post(`${BASE_URL}/login`, body);
}

export const services = { signUp, login };
