import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
// import CategoryProducts from "../components/widget/CategoryProducts";
import LoadingSpinner from "../components/common/LoadingSpinner";
import useCategories from "../hooks/useCategories";
import CategoriesNav from "../components/widget/CategoriesNav";

const CategoriesPage = () => {
  const { title } = useParams();

  const { data: categories = [], isLoading } = useCategories();

  return (
    <Box>
      {isLoading && <LoadingSpinner />}
      {/* {categories.length > 0 && !isLoading && categories.map(category => <CategoryProducts key={category._id} category={category} limit={6} />)} */}

      <CategoriesNav categories={categories} />
    </Box>
  );
};

export default CategoriesPage;
