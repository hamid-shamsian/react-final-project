import Box from "@mui/material/Box";
import ProductCard from "../components/widget/ProductCard";
import useProducts from "../hooks/useProducts";
import { Product } from "../services/productService";

const HomePage = () => {
  const { data } = useProducts({ page: 1, perPage: 10 });
  const { products = [] } = data ?? {};

  return (
    <Box sx={{ padding: 5, display: "flex", gap: 3, flexWrap: "wrap" }}>
      {products.map((p: Product) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </Box>
  );
};

export default HomePage;
