import { useSelector } from "react-redux";

const useThemeMode = () => useSelector((state: any) => state.themeMode);

export default useThemeMode;
