import { $API } from "../../api/axios";

/**
 * @param {{id:string}} id
 */
export const addToCart = async (id) => {
  const ROUTE = `api/v2/cart`;
  const response = await $API.privateApi.post(`${ROUTE}`, {
    productId: id,
  });
  return response;
};
