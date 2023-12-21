import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorPresentation from "../components/common/ErrorPresentation";
import SwiperSlider from "../components/widget/Swiper/Swiper";
import ProductDetails from "../components/widget/ProductDetails";
import useProduct from "../hooks/useProduct";
import config from "../../config.json";

const ProductPage = () => {
  const { id = "" } = useParams();
  const theme = useTheme();
  const descSection = useRef<HTMLElement>(null);

  const { data: product, isLoading, error } = useProduct(id);

  const images = product?.images.map(image => `${config.BACKEND_BASE_URL}/images/products/images/${image}`);
  if (descSection.current) descSection.current.innerHTML = product?.description ?? "";

  return (
    <Box minHeight='100vh' pt={5} px={2}>
      {isLoading && <LoadingSpinner mt={30} />}
      {!isLoading && error && <ErrorPresentation itemTitle='محصول' error={error} />}

      {product && (
        <Box>
          <Box display='flex' flexWrap='wrap' justifyContent='center'>
            <Box width={500} height={500} borderRadius={4} overflow='hidden' boxShadow='0 0 5px white'>
              <SwiperSlider images={images ?? []} />
            </Box>

            <Box
              sx={{
                p: 1,
                [theme.breakpoints.up("md")]: { p: 5 }
              }}
            >
              <ProductDetails product={product} />

              <Box display='flex' gap={3} mt={8}>
                <Button variant='contained' fullWidth>
                  اضافه به سبد خرید
                  <AddShoppingCartIcon sx={{ mr: 2 }} />
                </Button>
              </Box>
            </Box>
          </Box>

          <Box ref={descSection} sx={{ maxWidth: 1000, marginX: "auto", mt: 5, bgcolor: "#ccc", p: 3, borderRadius: 5, mb: 5 }}></Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductPage;
