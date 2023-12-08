import http from "./httpService";
import config from "../../config.json";

const productEndpoint = config.API_BASE_URL + "/products";

const getProducts = (page: number = 1, limit: number = 5) => http.get(`${productEndpoint}?limit=${limit}&page=${page}`);

const productService = {
  getProducts
};

export default productService;
