import { useSelector } from "react-redux";

const useUserData = () => useSelector((state: any) => state.user);

export default useUserData;
