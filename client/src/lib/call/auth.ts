import { API } from "..";

export const register = async (payload: {
  name: string;
  username: string;
  password: string;
}) => {
  return await API.post("/register", payload);
};

export const login = async (payload: {
  username: string;
  password: string;
}) => {
  return await API.post("/login", payload);
};
