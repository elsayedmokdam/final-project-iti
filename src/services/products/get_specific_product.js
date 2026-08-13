import { $API } from "../../api/axios";

/**
 * @param {{id:string}} id
 */
export const getSpecificProduct = async (id) => {
  const ROUTE = `api/v1/products/${id}`;
  const response = await $API.publicApi.get(`${ROUTE}`);
  return response;
};
