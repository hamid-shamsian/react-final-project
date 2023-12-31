import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorPresentation from "../components/common/ErrorPresentation";
import SwiperSlider from "../components/widget/Swiper/Swiper";
import ProductDetails from "../components/widget/ProductDetails";
import QtySelector from "../components/widget/QtySelector";
import useProduct from "../hooks/useProduct";
import useCart from "../hooks/useCart";
import { CartItem, cartActions } from "../redux/features/cartSlice";
import config from "../../config.json";
import AddToCartBtn from "../components/common/AddToCartBtn";

const ProductPage = () => {
  const { id = "" } = useParams();
  const { data: product, isLoading, error } = useProduct(id);

  const theme = useTheme();
  const descSection = useRef<HTMLElement>(null);
  const dispatch = useDispatch();

  const cart = useCart();
  const addedToCart: CartItem | undefined = cart.find((p: CartItem) => p._id === id);

  const [qty, setQty] = useState(addedToCart?.qty ?? 1);

  useEffect(() => {
    if (descSection.current) descSection.current.innerHTML = product?.description ?? "";
  }, [product]);

  const images = product?.images.map(image => `${config.BACKEND_BASE_URL}/images/products/images/${image}`);

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

              <Box display='flex' flexWrap='wrap' justifyContent='center' gap={3} mt={8}>
                {product.quantity > 0 && <QtySelector qty={qty} onChange={setQty} max={product.quantity} />}

                <Box sx={{ display: "flex", width: 250 }}>
                  <AddToCartBtn
                    selectedQty={qty}
                    addedQty={addedToCart?.qty}
                    enabled={!!product.quantity}
                    onClick={() => dispatch(cartActions.processItem({ _id: product._id, qty }))}
                  />
                </Box>
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
