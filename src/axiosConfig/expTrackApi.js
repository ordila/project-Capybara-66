import axios from "axios";

export const expTrackApi = axios.create({
  baseURL: "https://expense-tracker.b.goit.study/api/",
});

export const setToken = (token) => {
  expTrackApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  expTrackApi.defaults.headers.common.Authorization = "";
};
