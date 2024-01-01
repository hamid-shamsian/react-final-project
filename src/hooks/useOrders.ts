import { useQuery } from "@tanstack/react-query";
import orderService, { Order } from "../services/orderService";
import userService from "../services/userService";

export interface RichOrder extends Order {
  userFullName: string;
  address: string;
  phoneNumber: string;
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
    orders = orders.map((o: Order, i: number) => ({
      ...o,
      userFullName: userFullNames[i],
      address: users[i].data.data.user.address,
      phoneNumber: users[i].data.data.user.phoneNumber
    }));
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
