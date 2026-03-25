import api from "./api"; 

export const registerUser = (data) => {
    return api.post("/users/register", data);
}

export const loginUser = (credentials) => {
    return api.post("/users/login", credentials);
}
