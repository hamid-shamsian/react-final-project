import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import DataTable from "../../components/widget/DataTable";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StripedTable from "../../components/widget/StripedTable";
import RadioBtnGroup from "./../../components/common/RadioBtnGroup";
import orderService from "../../services/orderService";
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

export interface richOrderType extends orderType {
  userFullName: string;
}

const radioBtns = [
  { value: "not-delivered", label: "سفارش‌های در انتظار ارسال" },
  { value: "delivered", label: "سفارش‌های تحویل شده" },
  { value: "all", label: "همه سفارش‌ها" }
];

const tableColumns = [
  {
    label: "نام مشتری",
    path: "userFullName"
  },
  {
    label: "مجموع سفارش",
    path: "totalPrice"
  },
  {
    label: "تاریخ ثبت سفارش",
    path: "createdAt"
  },
  {
    label: "عملیات",
    key: "actions",
    content: (item: any) => (
      <div id={item._id}>
        <Button variant='outlined' size='small'>
          مشاهده جزییات
        </Button>
        <Button variant='contained' size='small' color='error' sx={{ mr: 2 }}>
          حذف
        </Button>
      </div>
    )
  }
];

const getOrdersOfPage = async (
  page: number,
  filter: string,
  setOrdersCallBack: Dispatch<SetStateAction<never[]>>,
  setTotalPagesCallBack: Dispatch<SetStateAction<number>>
) => {
  try {
    const { data } = await orderService.getOrders(page, filter);

    setTotalPagesCallBack(data.total_pages);
    const { orders } = data.data;

    const users = await Promise.all(orders.map((o: orderType) => o.user).map((userId: string) => userService.getUserById(userId)));

    const userFullNames = users.map(u => u.data.data.user.firstname + " " + u.data.data.user.lastname);
    const richOrderItems = orders.map((o: orderType, i: number) => ({ ...o, userFullName: userFullNames[i] }));

    setOrdersCallBack(richOrderItems);
  } catch (error) {}
};

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("not-delivered");

  useEffect(() => {
    (async () => await getOrdersOfPage(currentPage, filter, setOrders, setTotalPages))();
  }, [currentPage, filter]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event; // just to satisfy typescript :))
    setCurrentPage(value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((event.target as HTMLInputElement).value);
    setCurrentPage(1);
  };

  const mappedRowsData = orders.map((order: richOrderType) => ({
    ...order,
    id: order._id,
    createdAt: new Intl.DateTimeFormat("fa-IR").format(new Date(order.createdAt))
  }));

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: 5, mb: 3 }}>
        <Typography variant='h4' component='h2' mb={5}>
          سفارشات
        </Typography>

        <RadioBtnGroup value={filter} onChange={handleFilterChange} options={radioBtns} />
      </Box>

      <StripedTable columns={tableColumns} rowsData={mappedRowsData} />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          renderItem={item => <PaginationItem slots={{ previous: ArrowForwardIcon, next: ArrowBackIcon }} {...item} />}
          sx={{ marginTop: 5 }}
        />
      </Box>
    </>
  );

  // return <DataTable rowsData={mappedRowsData} />;
};

export default AdminOrdersPage;
