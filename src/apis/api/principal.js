import instansce from "../utils/instance"

export const getPrincipalRequest = async () => {
    return await instansce.get("/account/principal");
}