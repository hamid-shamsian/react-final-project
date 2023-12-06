import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/features/authSlice";
import auth from "../services/authService";

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    auth.logout();
    dispatch(authActions.setUser(null));
    navigate("/");
  });

  return null;
};

export default LogoutPage;
