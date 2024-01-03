import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import stylisRTLPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { ToastContainer } from "react-toastify";
import router from "./routes/routes";
import useThemeMode from "./hooks/useThemeMode";
import themes from "./styles/themes";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();
const cacheRtl = createCache({ key: "muirtl", stylisPlugins: [prefixer, stylisRTLPlugin] });

const App = () => {
  const themeMode = useThemeMode();

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={themes[themeMode] ?? themes.light}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <ToastContainer rtl />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
