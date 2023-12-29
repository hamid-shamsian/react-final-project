import { useQuery } from "@tanstack/react-query";
import orderService from "../services/orderService";
import userService from "../services/userService";

interface OrderProduct {
  product: string;
  count: number;
  _id: string;
}

interface Order {
  createdAt: string;
  deliveryDate: string;
  deliveryStatus: boolean;
  products: OrderProduct[];
  totalPrice: number;
  updatedAt: string;
  user: string;
  _id: string;
}

export interface RichOrder extends Order {
  userFullName: string;
}

interface OrderQuery {
  page: number;
  perPage: number;
  filter: string;
  richItems?: boolean;
}

interface OrdersData {
  orders: Order[] | RichOrder[];
  totalCount: number;
}

const fetchOrders = async ({ page, perPage, filter, richItems }: OrderQuery): Promise<OrdersData> => {
  const { data } = await orderService.getAll(page, perPage, filter);
  let { orders } = data.data;

  if (richItems) {
    const users = await Promise.all(orders.map((o: Order) => o.user).map((userId: string) => userService.getUserById(userId)));

    const userFullNames = users.map(u => u.data.data.user.firstname + " " + u.data.data.user.lastname);
    orders = orders.map((o: Order, i: number) => ({ ...o, userFullName: userFullNames[i] }));
  }

  return { orders, totalCount: data.total };
};

const useOrders = (query: OrderQuery) =>
  useQuery<OrdersData, Error>({
    queryKey: ["orders", query],
    queryFn: () => fetchOrders(query),
    placeholderData: prevData => prevData
  });

export default useOrders;
