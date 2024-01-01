import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import SuccessIcon from "@mui/icons-material/CheckCircleOutline";
import FailIcon from "@mui/icons-material/CancelOutlined";
import useCart from "../hooks/useCart";
import useUser from "../hooks/useUser";
import useAddOrder from "../hooks/useAddOrder";
import { cartActions } from "../redux/features/cartSlice";

const PaymentPage = () => {
  const cart = useCart();
  const user = useUser();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const paymentStatus = searchParams.get("status");
  const isSuccessful = paymentStatus === "successful";

  const addOrder = useAddOrder();

  useEffect(() => {
    if (paymentStatus === "successful" && user && cart.length) {
      const newOrder = { user: user._id, products: cart.map(item => ({ product: item._id, count: item.qty })) };
      addOrder.mutate(newOrder);
      dispatch(cartActions.clearCart());
    }
  }, [user]);

  return (
    <Box width={600} mx='auto' p={5} minHeight='60vh'>
      <Typography component='h2' variant='h4' fontWeight='bold' mb={5} display='flex' justifyContent='center' alignItems='center' gap={3}>
        {isSuccessful ? (
          <>
            <span style={{ color: "green" }}>پرداخت موفق</span>
            <SuccessIcon sx={{ fontSize: 50, color: "green" }} />
          </>
        ) : (
          <>
            <span style={{ color: "red" }}>پرداخت ناموفق</span>
            <FailIcon sx={{ fontSize: 50, color: "red" }} />
          </>
        )}
      </Typography>

      <Box mt={10} textAlign='center'>
        <Typography>
          {isSuccessful ? "با تشکر از پرداخت شما. سفارش شما با موفقیت ثبت شد" : "پرداخت شما موفقیت‌آمیز نبود. لطفا مجددا امتحان کنید."}
        </Typography>

        {isSuccessful ? (
          <>
            <Typography my={4}>شماره سفارش: {6557434}</Typography>
            <Button variant='contained'>پیگیری سفارش</Button>
          </>
        ) : (
          <>
            <Button variant='contained' sx={{ mt: 4 }} onClick={() => location.assign("http://127.0.0.1:5500/")}>
              تلاش دوباره
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default PaymentPage;