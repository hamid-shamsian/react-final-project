import { Fragment } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import CategoriesNav from "../components/widget/CategoriesNav";
import FlexContainer from "../components/mui-customized/FlexContainer";
import ProductCard from "../components/widget/ProductCard";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import { Product } from "../services/productService";

const CategoriesPage = () => {
  const { cat } = useParams();

  const { data: categories = [], isLoading } = useCategories();
  const selectedCat = categories.find(c => c.slugname === cat);

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useProducts.infinite({ perPage: 20, ofCatId: selectedCat?._id });

  return (
    <Box display='flex' alignItems='start'>
      {isLoading && <LoadingSpinner />}

      <Box position='fixed' top={65} bottom={0} overflow='auto'>
        <Typography variant='h6' component='h3' p={2}>
          دسته‌بندی محصولات
        </Typography>
        <CategoriesNav categories={categories} />
      </Box>

      <Box mr={30} p={5}>
        {isFetching ? (
          <LoadingSpinner mb={6} size={50} />
        ) : (
          <Typography variant='h3' component='h2' pb={5} textAlign='center'>
            {selectedCat?.name}
          </Typography>
        )}
        <FlexContainer>
          {data?.pages.map((page, i) => (
            <Fragment key={i}>
              {page.products.map((product: Product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </Fragment>
          ))}

          {hasNextPage && <Button onClick={() => fetchNextPage()}>مشاهده بیشتر...</Button>}
        </FlexContainer>

        {isFetchingNextPage && <LoadingSpinner />}
      </Box>
    </Box>
  );
};

export default CategoriesPage;
