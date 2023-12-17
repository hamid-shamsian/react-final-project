import http from "./httpService";
import config from "../../config.json";

const subCategoryEndpoint = config.API_BASE_URL + "/subcategories";

export interface SubCategory {
  _id: string;
  name: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
}

interface GetAllSubCategoriesResponse {
  page: number;
  per_page: number;
  subcategories: SubCategory[];
  total: number;
}

const getAll = (byCategoryId?: string) => {
  const filterQuery = byCategoryId ? `&category=${byCategoryId}` : "";
  return http.get<GetAllSubCategoriesResponse>(`${subCategoryEndpoint}?limit=100${filterQuery}`).then(res => res.data);
};

const getById = (id: string) => http.get(subCategoryEndpoint + "/" + id).then(res => res.data);

const subCatService = {
  getAll,
  getById
};

export default subCatService;
