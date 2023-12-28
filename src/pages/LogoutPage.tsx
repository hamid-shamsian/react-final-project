import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../redux/features/userSlice";
import authService from "../services/authService";
import { cartActions } from "../redux/features/cartSlice";

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    authService.logout();
    dispatch(userActions.setUser(null));
    dispatch(cartActions.clearCart());
    navigate("/");
  });

  return null;
};

export default LogoutPage;
