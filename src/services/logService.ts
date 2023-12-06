import { AxiosError } from "axios";

const log = (error: AxiosError) => console.log(error); // I will use sentry.io or other log services in the future soon... :)

const logService = {
  log
};

export default logService;
