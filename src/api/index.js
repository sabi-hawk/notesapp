import axios from "axios";
import { setUser } from "../flux/reducers/auth";
import { setUserNotes } from "../flux/reducers/notes";
import store from "../flux/store";

const API = axios.create({ baseURL: 'http://localhost:3005' });

API.interceptors.request.use(
  (config) => {
    const { auth } = store.getState();
    if (auth?.user?.meta && config.headers) {
      config.headers["auth-token"] = auth.user.meta.token;
    }

    return config;
  },
  (error) => {
    console.log("API Request | Interceptor |  Error", error);
    return Promise.reject(error);
  }
);
API.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(setUser({}));
      store.dispatch(setUserNotes({}));
      return error.response;
    } else {
      return error?.response;
    }
  }
);
export default API;
