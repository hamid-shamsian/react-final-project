import { Box, Button, IconButton, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Modal from "../common/Modal";
import LoadingSpinner from "../common/LoadingSpinner";
import StripedTable from "./StripedTable";
import useProductsByIds from "../../hooks/useProductsByIds";
import { RichOrder } from "../../hooks/useOrders";
import { farsify } from "../../utils/utilityFuncs";

const tableColumns = [
  {
    label: "محصول",
    path: "name"
  },
  {
    label: "قیمت واحد (تومان)",
    key: "price",
    content: (item: any) => farsify(item.price)
  },
  {
    label: "تعداد سفارش",
    key: "qty",
    content: (item: any) => farsify(item.qty)
  }
];

interface OrderModalProps {
  open: boolean;
  order: RichOrder | null;
  onSetDelivered: (order: RichOrder) => void;
  onCancel: () => void;
}

const OrderModal = ({ open, order, onSetDelivered, onCancel }: OrderModalProps) => {
  const { products, isLoading } = useProductsByIds(order?.products?.map(p => p.product) ?? []);
  const mappedProducts = isLoading ? [] : products.map((p, i) => ({ ...p.data, qty: order?.products[i].count }));

  return (
    <Modal open={open} onClose={onCancel}>
      <Box p={1} position='relative'>
        <Box display='flex' width={700} mb={3}>
          <Box display='flex' flexDirection='column' gap={2} alignItems='end' ml={3}>
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

        {isLoading ? <LoadingSpinner /> : <StripedTable columns={tableColumns} rowsData={mappedProducts} />}

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

        <IconButton sx={{ position: "absolute", right: 0, top: 0 }} onClick={onCancel}>
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
    </Modal>
  );
};

export default OrderModal;
