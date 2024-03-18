import instansce from "../utils/instance";


export const signinRequest = async (data) => {
    const response = await instansce.post("/auth/signin", data);
    return response;
}