import { useParams } from "react-router-dom";

const CategoriesPage = () => {
  const { title } = useParams();

  return <div>Categories Page {title}</div>;
};

export default CategoriesPage;
