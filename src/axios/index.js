import axios from "axios";

const axios_instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

axios_instance.defaults.timeout = 2500;

axios_instance.defaults.headers.common["Content-Type"] = "application/json";


export default axios_instance;
