import API from "./index";

export const userLogin = (loginData) => API.post("/login", loginData);

export const registerUser = (signUpData) => API.post("/signup", signUpData);
