import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();

  return <div>Product Details Page. Product ID: {id}</div>;
};

export default ProductPage;
