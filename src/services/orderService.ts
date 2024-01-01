import http from "./httpService";
import config from "../../config.json";

const ordersEndpoint = config.API_BASE_URL + "/orders";

interface OrderItem {
  product: string;
  count: number;
}

interface NewOrder {
  user: string;
  products: OrderItem[];
}

const getAll = (page: number = 1, limit: number = 5, filter: string = "all") => {
  const filterQuery = filter !== "all" ? `&deliveryStatus=${filter === "delivered"}` : "";
  return http.get(`${ordersEndpoint}?limit=${limit}&page=${page}${filterQuery}`);
};

const addNew = (order: NewOrder) => http.post(ordersEndpoint, order);

const editById = ({ id, order }: any) => http.patch(`${ordersEndpoint}/${id}`, order).then(res => res.data);

const orderService = {
  getAll,
  addNew,
  editById
};

export default orderService;
