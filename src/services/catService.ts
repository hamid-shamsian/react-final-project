import apiClient from "./apiClient";
import { SubCategory } from "./subCatService";

export interface Category {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
  subcategories?: SubCategory[];
}

interface GetAllCategoriesResponse {
  page: number;
  per_page: number;
  categories: Category[];
  total: number;
}

const categoryEndpoint = "/categories";

const getAll = () => apiClient.get<GetAllCategoriesResponse>(categoryEndpoint + "?limit=100").then(res => res.data);

const catService = {
  getAll
};

export default catService;
