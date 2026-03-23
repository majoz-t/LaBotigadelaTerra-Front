import api from "./Api";

export const registerUser = (data) => {
    return api.post("/users/register", data);
}
