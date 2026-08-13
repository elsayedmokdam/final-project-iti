import { $API } from "../../../api/axios";

/**
 * @param {{ email:string, newPassword:string}} payload 
 */

export const resetPassword = (payload) => {
    const ROUTE = "api/v1/auth/resetPassword";
    const response = $API.publicApi.put(`${ROUTE}`, payload);
    return response;
}