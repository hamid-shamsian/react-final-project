import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../redux/features/userSlice";
import authService from "../services/authService";

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    authService.logout();
    dispatch(userActions.setUser(null));
    navigate("/");
  });

  return null;
};

export default LogoutPage;
