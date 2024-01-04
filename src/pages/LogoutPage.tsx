import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/features/cartSlice";
import { logout } from "../redux/features/auth/authThunks";
import LoadingSpinner from "../components/common/LoadingSpinner";

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartActions.clearCart());

    (async () => {
      dispatch(logout() as any)
        .unwrap()
        .then((_: any) => navigate("/"));
    })();
  });

  return (
    <div style={{ height: "80vh" }}>
      <LoadingSpinner />
    </div>
  );
};

export default LogoutPage;
