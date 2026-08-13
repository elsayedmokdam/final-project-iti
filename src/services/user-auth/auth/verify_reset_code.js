import { $API } from "../../../api/axios";

export const verifyResetCode = async (payload) => {
    const ROUTE = `api/v1/auth/verifyResetCode`;

    const response = await $API.publicApi.post(`${ROUTE}`, payload);
    return response;
}