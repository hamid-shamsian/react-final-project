import http from "./httpService";
import config from "../../config.json";

export interface Product {
  category: string;
  categoryName?: string;
  createdAt: string;
  description: string;
  images: string[];
  name: string;
  price: number;
  quantity: number;
  rating: {
    rate: number;
    count: number;
  };
  slugname: string;
  subcategory: string;
  subcategoryName?: string;
  thumbnail: string;
  updatedAt: string;
  _id: string;
}

interface GetAllProductsResponse {
  page: number;
  per_page: number;
  products: Product[];
  total: number;
}

const productEndpoint = config.API_BASE_URL + "/products";

const getAll = (page: number = 1, limit: number = 5) =>
  http.get<GetAllProductsResponse>(`${productEndpoint}?limit=${limit}&page=${page}`).then(res => res.data);

const deleteById = (id: string) => http.delete(`${productEndpoint}/${id}`).then(res => res.data);

const productService = {
  getAll,
  deleteById
};

export default productService;
