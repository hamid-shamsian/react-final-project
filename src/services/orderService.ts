import http from "./httpService";
import config from "../../config.json";

const ordersEndpoint = config.API_BASE_URL + "/orders";

const getOrders = (page: number = 1, limit: number = 5, filter: string = "all") => {
  const filterQuery = filter !== "all" ? `&deliveryStatus=${filter === "delivered"}` : "";
  return http.get(`${ordersEndpoint}?limit=${limit}&page=${page}${filterQuery}`);
};

const orderService = {
  getOrders
};

export default orderService;
