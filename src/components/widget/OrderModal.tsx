import Modal from "../common/Modal";
import { RichOrder } from "../../hooks/useOrders";
import { Box, Button, Typography } from "@mui/material";
import StripedTable from "./StripedTable";
import useProductsByIds from "../../hooks/useProductsByIds";

const tableColumns = [
  {
    label: "محصول",
    path: "name"
  },
  {
    label: "تعداد",
    path: "qty"
  },
  {
    label: "قیمت",
    path: "price"
  }
];

interface OrderModalProps {
  open: boolean;
  order: RichOrder | null;
  onSetDelivered: (order: RichOrder) => void;
  onCancel: () => void;
}

const OrderModal = ({ open, order, onSetDelivered, onCancel }: OrderModalProps) => {
  const { products } = useProductsByIds(order?.products?.map(p => p.product) ?? []);
  const mappedProducts = products?.map((p, i) => ({ ...p.data, qty: order?.products[i].count }));

  return (
    <Modal open={open} onClose={onCancel}>
      <>
        <Box display='flex' width={700} mb={3}>
          <Box display='flex' flexDirection='column' gap={2} alignItems='end' ml={5}>
            <Typography whiteSpace='nowrap'>نام مشتری</Typography>
            <Typography whiteSpace='nowrap'>آدرس</Typography>
            <Typography whiteSpace='nowrap'>تلفن</Typography>
            <Typography whiteSpace='nowrap'>زمان ثبت سفارش</Typography>
            <Typography whiteSpace='nowrap'>زمان تحویل انتخابی</Typography>
          </Box>
          <Box display='flex' flexDirection='column' gap={2} alignItems='start' ml={5}>
            <Typography>{order?.userFullName}</Typography>
            <Typography>{order?.address}</Typography>
            <Typography>{order?.phoneNumber}</Typography>
            <Typography>{order?.createdAt}</Typography>
            <Typography>{order?.deliveryDate}</Typography>
          </Box>
        </Box>

        <StripedTable columns={tableColumns} rowsData={mappedProducts ?? []} />

        {order && (
          <Box display='flex' justifyContent='center' mt={3}>
            {order?.deliveryStatus ? (
              <Typography>تاریخ تحویل: {new Intl.DateTimeFormat("fa-IR").format(new Date(order.updatedAt))}</Typography>
            ) : (
              <Button variant='contained' onClick={() => onSetDelivered(order)}>
                تحویل شد
              </Button>
            )}
          </Box>
        )}
      </>
    </Modal>
  );
};

export default OrderModal;
