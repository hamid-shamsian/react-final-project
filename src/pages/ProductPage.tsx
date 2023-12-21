import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorPresentation from "../components/common/ErrorPresentation";
import SwiperSlider from "../components/widget/Swiper/Swiper";
import useProduct from "../hooks/useProduct";
import config from "../../config.json";

const ProductPage = () => {
  const { id = "" } = useParams();

  const { data: product, isLoading, error } = useProduct(id);

  const images = product?.images.map(image => `${config.BACKEND_BASE_URL}/images/products/thumbnails/${image}`);

  return (
    <Box minHeight='100vh'>
      {isLoading && <LoadingSpinner mt={30} />}
      {!isLoading && error && <ErrorPresentation itemTitle='محصول' error={error} />}

      <Box width={500}>
        <SwiperSlider images={images ?? []} />
      </Box>
    </Box>
  );
};

export default ProductPage;
