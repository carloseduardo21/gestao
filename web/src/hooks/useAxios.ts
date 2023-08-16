import axios from 'axios'

const APIServer = axios.create({
  baseURL: 'http://localhost:3333/api',
})

const APIWeb = axios.create({
  baseURL: 'http://localhost:3333/api',
})

export { APIServer, APIWeb }
