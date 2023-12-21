import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import CustomLink from "../../components/common/CustomLink";
import StyledBreadcrumb from "../../components/mui-customized/StyledBreadcrumb";
import { farsify } from "../../utils/utilityFuncs";
import { RichProduct } from "../../services/productService";

const ProductDetails = ({ product }: { product: RichProduct }) => {
  return (
    <>
      <Typography variant='h4' component='h1' mt={5}>
        {product.name}
      </Typography>

      <Box display='flex' gap={3} mt={10} justifyContent='space-between' alignItems='center'>
        <Typography>گروه محصول: </Typography>
        <Breadcrumbs separator='\'>
          <StyledBreadcrumb component={CustomLink} to={`/categories/${product.category.slugname}`} label={product.category.name} />
          <StyledBreadcrumb
            component={CustomLink}
            to={`/categories/${product.category.slugname}/${product.subcategory.slugname}`}
            label={product.subcategory.name}
          />
        </Breadcrumbs>
      </Box>

      <Box display='flex' gap={5} mt={5} justifyContent='space-between' alignItems='center'>
        <Typography>رتبه محصول: </Typography>
        <Rating precision={0.5} value={product.rating.rate} size='large' sx={{ direction: "ltr" }} />
      </Box>

      <Box display='flex' gap={5} mt={5} justifyContent='space-between' alignItems='center'>
        <Typography>قیمت محصول: </Typography>
        <Chip label={`${farsify(product.price)} تومان`} variant='outlined' sx={{ fontSize: 18, py: 2, px: 1 }} />
      </Box>
    </>
  );
};

export default ProductDetails;
