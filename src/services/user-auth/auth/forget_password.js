
/**
 * @param {{ email:string}} payload 
 */

import { $API } from "../../../api/axios";

export const forgetPassword = async (payload) => {
    const ROUTE = "api/v1/auth/forgotPasswords";
    const response = await $API.publicApi.post(`${ROUTE}`, payload);
    return response;
};