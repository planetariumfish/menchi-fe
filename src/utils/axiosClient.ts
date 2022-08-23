import axios from "axios";

export default () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  const token = localStorage.getItem("token");

  instance.defaults.headers.common["x-access-token"] = token || "";

  return instance;
};
