import http from "./httpService";
import config from "../../config.json";

const ordersEndpoint = config.API_BASE_URL + "/orders";

const getOrders = (page: number = 1, limit: number = 5) => {
  return http.get(`${ordersEndpoint}?limit=${limit}&page=${page}`);
};

const orderService = {
  getOrders
};

export default orderService;
