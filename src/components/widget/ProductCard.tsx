import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Product } from "../../services/productService";
import { farsify } from "../../utils/utilityFuncs";
import config from "../../../config.json";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/products/${product._id}`} style={{ textDecoration: "none", display: "inline-flex" }}>
      <Card sx={{ display: "inline-flex", minWidth: "330px", position: "relative" }}>
        <img width={150} height={150} src={`${config.BACKEND_BASE_URL}/images/products/thumbnails/${product.thumbnail}`} alt='Product Image' />
        <Box>
          <CardContent>
            <Typography gutterBottom variant='body1' component='h4' noWrap textOverflow='ellipsis' width='130px' overflow='hidden'>
              {product.name}
            </Typography>
          </CardContent>
          <Typography sx={{ flexGrow: 1 }} variant='body2' paddingX={2}>
            {farsify(product.price)} تومان
          </Typography>
        </Box>
        <CardActions sx={{ display: "flex", justifyContent: "end", position: "absolute", left: 0, bottom: 0 }}>
          <Rating precision={0.5} value={product.rating.rate} size='small' sx={{ direction: "ltr", ml: 1 }} />
          <IconButton color='info' type='button' onClick={e => e.preventDefault()}>
            <AddShoppingCartIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Link>
  );
};

export default ProductCard;
