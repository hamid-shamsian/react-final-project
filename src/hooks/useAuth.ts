import { useSelector } from "react-redux";

const useAuth = () => useSelector((state: any) => state.auth);

export default useAuth;
