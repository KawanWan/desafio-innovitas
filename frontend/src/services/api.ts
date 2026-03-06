import axios from 'axios';

export const apiLocal = axios.create({
  baseURL: 'http://localhost:3000',
});

export const apiExternal = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});