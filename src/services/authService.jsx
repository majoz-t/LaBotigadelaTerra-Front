import api from "./api"; 

export const registerUser = (data) => {
    return api.post("/users/register", data);
}

export const deleteUser = (id) => {
    return api.delete(`/users/delete/${id}`);
}

export const loginUser = (credentials) => {
    return api.post("/users/login", credentials);
}


