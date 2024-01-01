import Button from "@mui/material/Button";
import { RichOrder } from "../hooks/useOrders";

const tableColumns = [
  {
    label: "نام مشتری",
    path: "userFullName"
  },
  {
    label: "مجموع سفارش (تومان)",
    path: "totalPrice"
  },
  {
    label: "تاریخ ثبت سفارش",
    path: "createdAt"
  },
  {
    label: "وضعیت سفارش",
    key: "deliveryStatus",
    content: (order: RichOrder) => (order.deliveryStatus ? "تحویل شده" : "در انتظار ارسال")
  },
  {
    key: "open",
    content: (order: RichOrder, _open: (order: RichOrder) => void) => (
      <Button variant='outlined' size='small' onClick={() => _open(order)}>
        مشاهده جزییات
      </Button>
    )
  }
];

export default tableColumns;
