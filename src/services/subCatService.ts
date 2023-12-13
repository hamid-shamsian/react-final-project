import http from "./httpService";
import config from "../../config.json";

const subCategoryEndpoint = config.API_BASE_URL + "/subcategories";

const getById = (id: string) => http.get(subCategoryEndpoint + "/" + id).then(res => res.data);

const subCatService = {
  getById
};

export default subCatService;
