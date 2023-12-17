import http from "./httpService";
import config from "../../config.json";
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

const categoryEndpoint = config.API_BASE_URL + "/categories";

const getAll = () => http.get<GetAllCategoriesResponse>(categoryEndpoint + "?limit=100").then(res => res.data);

const catService = {
  getAll
};

export default catService;
