import { $API } from "../../../api/axios";

/**
 *@param {{password:string, newPassword:string}} payload - The payload is required
 */

export const changePassword = async (payload) => {
  const ROUTE = "api/v1/users/changeMyPassword";

  const response = await $API.privateApi.put(`${ROUTE}`, payload);
  return response;
};
