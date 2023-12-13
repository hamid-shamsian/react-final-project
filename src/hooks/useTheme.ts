import { useSelector } from "react-redux";

const useTheme = () => useSelector((state: any) => state.theme);

export default useTheme;
