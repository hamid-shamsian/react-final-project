import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import RadioBtnGroup from "../../components/common/RadioBtnGroup";
import Pagination from "../../components/common/Pagination";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import StripedTable from "../../components/widget/StripedTable";
import OrderModal from "../../components/widget/OrderModal";
import useOrders, { RichOrder } from "../../hooks/useOrders";
import useEditOrder from "../../hooks/useEditOrder";
import tableColumns from "../../tablesColumns/adminOrders";
import { farsify } from "../../utils/utilityFuncs";

const radioBtns = [
  { value: "not-delivered", label: "سفارش‌های در انتظار ارسال" },
  { value: "delivered", label: "سفارش‌های تحویل شده" },
  { value: "all", label: "همه سفارش‌ها" }
];

const AdminOrdersPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [filter, setFilter] = useState("not-delivered");
  const [orderModal, setOrderModal] = useState<{ open: boolean; order: RichOrder | null }>({ open: false, order: null });

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
    createdAt: new Intl.DateTimeFormat("fa-IR").format(new Date(order.createdAt)),
    deliveryDate: new Intl.DateTimeFormat("fa-IR").format(new Date(order.deliveryDate)),
    totalPrice: farsify(order.totalPrice)
  }));

  const handleOpenOrderModal = (order: RichOrder) => setOrderModal({ open: true, order });
  const handleCloseOrderModal = () => setOrderModal(prev => ({ ...prev, open: false }));

  const editOrder = useEditOrder();

  const handleSetDelivered = (order: RichOrder) => {
    editOrder.mutate({ id: order._id, order: { deliveryStatus: true } });
    setOrderModal({ open: false, order });
  };

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
          <StripedTable columns={tableColumns} rowsData={mappedRowsData} actions={{ open: handleOpenOrderModal }} />
        </Pagination>
      )}

      <OrderModal open={orderModal.open} order={orderModal.order} onSetDelivered={handleSetDelivered} onCancel={handleCloseOrderModal} />
    </>
  );
};

export default AdminOrdersPage;
