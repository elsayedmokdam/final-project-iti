import { $API } from "../../api/axios";

export const getAllProducts = async () => {
  const ROUTE = "api/v1/products";
  const response = await $API.publicApi.get(`${ROUTE}`);
  return response;
};
