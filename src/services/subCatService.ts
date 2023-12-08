import http from "./httpService";
import config from "../../config.json";

const subCategoryEndpoint = config.API_BASE_URL + "/subcategories";

const getSubCatById = (id: string) => http.get(subCategoryEndpoint + "/" + id);

const subCatService = {
  getSubCatById
};

export default subCatService;
