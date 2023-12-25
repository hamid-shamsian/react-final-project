import { Fragment } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "../components/common/LoadingSpinner";
import CategoriesNav from "../components/widget/CategoriesNav";
import FlexContainer from "../components/mui-customized/FlexContainer";
import ProductCard from "../components/widget/ProductCard";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import { Product } from "../services/productService";

const CategoriesPage = () => {
  const { cat, subCat } = useParams();
  const { data: categories = [], isLoading: catsIsLoading } = useCategories();

  const selectedCat = cat ? categories.find(c => c.slugname === cat) : null;
  const selectedSubCat = subCat
    ? categories
        .map(c => c.subcategories)
        .flat(1)
        .find(s => s?.slugname === subCat)
    : null;

  const { data, isFetching, fetchNextPage, hasNextPage } = useProducts.infinite({
    perPage: 20,
    ofCatId: selectedCat?._id,
    ofSubCatId: selectedSubCat?._id
  });

  const fetchedProductsCount = data?.pages.reduce((total, page) => total + page.products.length, 0) ?? 0;

  return (
    <Box display='flex' alignItems='start'>
      <Box position='sticky' flexBasis={250} flexShrink={0} minHeight='50vh' maxHeight='90vh' top={65} overflow='auto'>
        <Typography variant='h6' component='h3' p={2}>
          دسته‌بندی محصولات
        </Typography>
        {catsIsLoading ? <LoadingSpinner /> : <CategoriesNav categories={categories} />}
      </Box>

      <Box p={4} flexGrow={1}>
        {isFetching ? (
          <LoadingSpinner mb={5} size={40} />
        ) : (
          <Typography variant='h3' component='h2' pb={5} textAlign='center'>
            {selectedSubCat?.name || selectedCat?.name || "همه محصولات"}
          </Typography>
        )}

        <InfiniteScroll dataLength={fetchedProductsCount} hasMore={hasNextPage} next={() => fetchNextPage()} loader={<LoadingSpinner mt={5} />}>
          <FlexContainer>
            {data?.pages.map((page, i) => (
              <Fragment key={i}>
                {page.products.map((product: Product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </Fragment>
            ))}
          </FlexContainer>
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default CategoriesPage;
