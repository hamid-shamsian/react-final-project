import { useSelector } from "react-redux";
import { CartItem } from "../redux/features/cartSlice";

const useCart = (): CartItem[] => useSelector((state: any) => state.cart);

export default useCart;
