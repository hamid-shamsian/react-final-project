import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorPresentation from "../components/common/ErrorPresentation";
import useProduct from "../hooks/useProduct";

const ProductPage = () => {
  const { id = "" } = useParams();

  const { isLoading, error } = useProduct(id);

  return (
    <Box minHeight='100vh'>
      {isLoading && <LoadingSpinner mt={30} />}
      {!isLoading && error && <ErrorPresentation itemTitle='محصول' error={error} />}
    </Box>
  );
};

export default ProductPage;
