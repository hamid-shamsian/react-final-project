import http from "./httpService";
import config from "../../config.json";
import { Category } from "./catService";
import { SubCategory } from "./subCatService";

export interface Product {
  name: string;
  category: string;
  subcategory: string;
  price: number;
  quantity: number;
  description: string;
  thumbnail: string;
  images: string[];
  rating: {
    rate: number;
    count: number;
  };
  categoryName?: string;
  subcategoryName?: string;
  slugname: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface RichProduct {
  name: string;
  category: Category;
  subcategory: SubCategory;
  price: number;
  quantity: number;
  description: string;
  thumbnail: string;
  images: string[];
  rating: {
    rate: number;
    count: number;
  };
  slugname: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

interface GetAllResponse {
  page: number;
  per_page: number;
  products: Product[];
  total: number;
}

export interface EditingData {
  id: string;
  product: Object;
}

const productEndpoint = config.API_BASE_URL + "/products";

const getAll = (page: number = 1, limit: number = 5, ofCatId?: string) => {
  const filterQuery = ofCatId ? `&category=${ofCatId}` : "";
  return http.get<GetAllResponse>(`${productEndpoint}?limit=${limit}&page=${page}${filterQuery}`).then(res => res.data);
};

const addNew = (product: FormData) => http.post(productEndpoint, product);

const getById = (id: string) =>
  http
    .get<RichProduct>(`${productEndpoint}/${id}`)
    .then(res => res.data)
    .catch(er => {
      throw er;
    });

const deleteById = (id: string) => http.delete(`${productEndpoint}/${id}`).then(res => res.data);

const editById = ({ id, product }: EditingData) => http.patch<Product>(`${productEndpoint}/${id}`, product).then(res => res.data);

const productService = {
  getAll,
  addNew,
  getById,
  deleteById,
  editById
};

export default productService;
