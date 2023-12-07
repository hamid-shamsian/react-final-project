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
    // maybe send a request to backend to invalidate the current refreshToken... but the backend respond to this request by accessToken !!
  });

  return null;
};

export default LogoutPage;