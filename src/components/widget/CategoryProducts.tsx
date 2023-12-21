import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ProductCard from "./ProductCard";
import CustomLink from "./../common/CustomLink";
import LoadingSpinner from "../common/LoadingSpinner";
import useProducts from "../../hooks/useProducts";
import { Category } from "../../services/catService";
import { Product } from "../../services/productService";

interface ProductsOfCatProps {
  category: Category;
  limit: number;
}

const CategoryProducts = ({ category, limit }: ProductsOfCatProps) => {
  const { data, isLoading } = useProducts({ page: 1, perPage: limit, ofCatId: category._id });
  const { products = [] } = data ?? {};

  const theme = useTheme();

  return (
    <Box
      component='section'
      sx={{
        mx: 1,
        my: 4,
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 3,
        backgroundColor: "divider",

        [theme.breakpoints.up("md")]: {
          flexDirection: "row",
          justifyContent: "space-between",
          m: 5
        }
      }}
    >
      <Typography variant='h4' component='h2' sx={{ fontWeight: "bold", p: 5, textShadow: "0 0 2px white" }}>
        <CustomLink to={`/categories/${category.slugname}`}>{category.name}</CustomLink>
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 2,

          [theme.breakpoints.up("md")]: {
            justifyContent: "end"
          }
          // padding: 3,
          // borderRadius: 2,
          // backgroundColor: theme.palette.background.paper
        }}
      >
        {isLoading && <LoadingSpinner />}
        {products.length > 0 && !isLoading && products.map((p: Product) => <ProductCard key={p._id} product={p} />)}
      </Box>
    </Box>
  );
};

export default CategoryProducts;
