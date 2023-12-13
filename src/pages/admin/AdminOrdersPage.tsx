import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RadioBtnGroup from "../../components/common/RadioBtnGroup";
import Pagination from "../../components/common/Pagination";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import StripedTable from "../../components/widget/StripedTable";
import useOrders, { RichOrder } from "../../hooks/useOrders";

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
    content: (item: RichOrder) => (
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

const AdminOrdersPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [filter, setFilter] = useState("not-delivered");

  const { data, isLoading } = useOrders({ page, perPage, filter, richItems: true });
  const { orders = null, totalCount = 0 } = data ?? {};

  const handlePageChange = (page: number) => setPage(page);
  const handlePerPageChange = (perPage: number) => {
    setPage(1);
    setPerPage(perPage);
  };
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((event.target as HTMLInputElement).value);
    setPage(1);
  };

  const mappedRowsData = orders?.map(order => ({
    ...order,
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

      {isLoading && <LoadingSpinner />}

      {!orders && !isLoading && <Typography textAlign='center'>هنوز سفارشی ندارید!</Typography>}

      {mappedRowsData && !isLoading && (
        <Pagination
          itemsTitle='سفارش'
          itemsCount={totalCount}
          page={page}
          perPage={perPage}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
        >
          <StripedTable columns={tableColumns} rowsData={mappedRowsData} />
        </Pagination>
      )}
    </>
  );
};

export default AdminOrdersPage;
