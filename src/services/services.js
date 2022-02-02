import axios from 'axios';

const BASE_URL = 'http://localhost:5000';
async function signUp(body) {
  return axios.post(`${BASE_URL}/signup`, body);
}

export const services = { signUp };
