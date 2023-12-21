import Typography from "@mui/material/Typography";
import ProductCard from "./ProductCard";
import CustomLink from "./../common/CustomLink";
import LoadingSpinner from "../common/LoadingSpinner";
import StyledSection from "../mui-customized/StyledSection";
import FlexContainer from "../mui-customized/FlexContainer";
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

  return (
    <StyledSection>
      <Typography variant='h4' component='h2' sx={{ fontWeight: "bold", p: 5, textShadow: "0 0 2px white" }}>
        <CustomLink to={`/categories/${category.slugname}`}>{category.name}</CustomLink>
      </Typography>

      <FlexContainer>
        {isLoading && <LoadingSpinner />}
        {products.length > 0 && !isLoading && products.map((p: Product) => <ProductCard key={p._id} product={p} />)}
      </FlexContainer>
    </StyledSection>
  );
};

export default CategoryProducts;
