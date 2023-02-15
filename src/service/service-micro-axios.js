import axios from "axios";

import TokenServiceUser from "./user-service";

const THREE_MINUTES = 3 * 60 * 1000;
export const baseURL = "http://3.111.143.185:5300/api/"
/**
 * Axios HTTP Client
 * {@link https://github.com/axios/axios#request-config Axios Request Config}
 */
const MicroMCPHttpClient = axios.create({
  baseURL,
  timeout: THREE_MINUTES,
});

/**
 * Pass Integito API Key in Header
 */
MicroMCPHttpClient.interceptors.request.use(async config => {
  const token = TokenServiceUser.getAuthToken();

  if (config && config.headers) {
    if (token) {
      config.headers["Authorization"] = "Token " + token;
    }
  }
  return config;
});

export { MicroMCPHttpClient };

