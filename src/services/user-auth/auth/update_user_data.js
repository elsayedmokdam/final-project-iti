import { $API } from "../../../api/axios";

/**
 *@param {{name:string, email:string}} payload - The payload is required
 */
export const updateUserData = async (payload) => {
  const ROUTE = "api/v1/users/updateMe/";

  const response = await $API.privateApi.put(`${ROUTE}`, payload);
  return response;
};
