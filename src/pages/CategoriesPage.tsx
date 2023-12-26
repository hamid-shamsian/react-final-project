import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CloseIcon from "@mui/icons-material/Close";
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawer, setDrawer] = useState(false);

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
      {isMobile ? (
        <>
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1,
              m: 1,
              p: 1,
              bgcolor: theme.palette.primary.light,
              textAlign: "center",
              borderRadius: 2
            }}
          >
            <Button onClick={() => setDrawer(true)} sx={{ color: "white", fontWeight: "bold" }}>
              دسته‌بندی محصولات
              <KeyboardArrowUpIcon />
            </Button>
          </Box>
          <MuiDrawer anchor='bottom' open={drawer} onClose={() => setDrawer(false)} onClick={() => setDrawer(false)}>
            <IconButton onClick={() => setDrawer(false)}>
              <CloseIcon />
            </IconButton>
            {catsIsLoading ? <LoadingSpinner /> : <CategoriesNav categories={categories} />}
          </MuiDrawer>
        </>
      ) : (
        <Box position='sticky' flexBasis={250} flexShrink={0} minHeight='50vh' maxHeight='90vh' top={65} overflow='auto'>
          <Typography variant='h6' component='h3' p={2}>
            دسته‌بندی محصولات
          </Typography>
          {catsIsLoading ? <LoadingSpinner /> : <CategoriesNav categories={categories} />}
        </Box>
      )}

      <Box p={isMobile ? 2 : 4} flexGrow={1}>
        {isFetching ? (
          <LoadingSpinner mb={5} size={40} />
        ) : (
          <Typography variant='h3' component='h2' pb={5} textAlign='center'>
            {selectedSubCat?.name || selectedCat?.name || "همه محصولات"}
          </Typography>
        )}

        <InfiniteScroll dataLength={fetchedProductsCount} hasMore={hasNextPage} next={() => fetchNextPage()} loader={<LoadingSpinner mt={5} />}>
          <FlexContainer align='center'>
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
