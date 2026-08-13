import { $API } from "../../api/axios";

export const getLoggedUserCart = async () => {
  const ROUTE = "api/v2/cart";
  const response = await $API.privateApi.get(`${ROUTE}`);
  return response;
};
