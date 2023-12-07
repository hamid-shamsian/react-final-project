import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import router from "./routes/routes";
import store from "./redux/store";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
      <ToastContainer rtl />
    </ReduxProvider>
  );
};

export default App;
