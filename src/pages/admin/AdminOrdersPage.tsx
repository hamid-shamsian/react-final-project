import { Dispatch, SetStateAction, useEffect, useState } from "react";
import orderService from "../../services/ordersService";
import userService from "../../services/userService";

interface orderProductType {
  product: string;
  count: number;
  _id: string;
}

interface orderType {
  createdAt: string;
  deliveryDate: string;
  deliveryStatus: boolean;
  products: orderProductType[];
  totalPrice: number;
  updatedAt: string;
  user: string;
  _id: string;
}

interface richOrderType extends orderType {
  userFullName: string;
}

const getOrdersOfPage = async (
  page: number,
  setOrders: Dispatch<SetStateAction<richOrderType[]>>,
  setTotalPages: Dispatch<SetStateAction<number>>
) => {
  try {
    const { data } = await orderService.getOrders(page);

    setTotalPages(data.total_pages);
    const { orders } = data.data;

    const users = await Promise.all(orders.map((o: orderType) => o.user).map((userId: string) => userService.getUserById(userId)));

    const userFullNames = users.map(u => u.data.data.user.firstname + " " + u.data.data.user.lastname);
    const richOrderItems = orders.map((o: orderType, i: number) => ({ ...o, userFullName: userFullNames[i] }));

    setOrders(richOrderItems);
  } catch (error) {}
};

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    (async () => await getOrdersOfPage(currentPage, setOrders, setTotalPages))();
  }, [currentPage]);

  return (
    <div>
      <ul>
        {orders.map((o: richOrderType) => (
          <li key={o._id}>{o.userFullName}</li>
        ))}
      </ul>
      <button onClick={() => setCurrentPage(prevPage => prevPage + 1)}>next</button>
    </div>
  );
};

export default AdminOrdersPage;
