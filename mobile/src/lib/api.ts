import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.168.10.61:7777/api',
})
