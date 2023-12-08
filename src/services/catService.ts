import http from "./httpService";
import config from "../../config.json";

const categoryEndpoint = config.API_BASE_URL + "/categories";

const getCatById = (id: string) => http.get(categoryEndpoint + "/" + id);

const catService = {
  getCatById
};

export default catService;
