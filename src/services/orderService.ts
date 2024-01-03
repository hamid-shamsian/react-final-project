import apiClient from "./apiClient";

const ordersEndpoint = "/orders";

interface OrderProduct {
  product: string;
  count: number;
}

export interface Order {
  createdAt: string;
  deliveryDate: string;
  deliveryStatus: boolean;
  products: OrderProduct[];
  totalPrice: number;
  updatedAt: string;
  user: string;
  _id: string;
}

interface NewOrder {
  user: string;
  products: OrderProduct[];
  deliveryDate: Date;
}

const getAll = (page: number = 1, limit: number = 5, filter: string = "all") => {
  const filterQuery = filter !== "all" ? `&deliveryStatus=${filter === "delivered"}` : "";
  return apiClient.get(`${ordersEndpoint}?limit=${limit}&page=${page}${filterQuery}`);
};

const addNew = (order: NewOrder) => apiClient.post(ordersEndpoint, order);

const editById = ({ id, order }: { id: string; order: Partial<Order> }) => apiClient.patch(`${ordersEndpoint}/${id}`, order).then(res => res.data);

const orderService = {
  getAll,
  addNew,
  editById
};

export default orderService;
