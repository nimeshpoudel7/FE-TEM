import axios from "axios";

import TokenService from "./service-token";
import TokenServiceUser from "./user-service";

const THREE_MINUTES = 3 * 60 * 1000;
export const baseURL = "https://qa.lendenclub.com/api/"

/**
 * Axios HTTP Client
 * {@link https://github.com/axios/axios#request-config Axios Request Config}
 */
const MCPHttpClient = axios.create({
  baseURL,
  timeout: THREE_MINUTES,
});

/**
 * Pass Integito API Key in Header
 */
MCPHttpClient.interceptors.request.use(async config => {
  const token = TokenService.getToken() != null? TokenService.getToken(): TokenServiceUser.getAuthToken();
  // const token="cf74411241b1074f71930abe3a116a4c572e54e0"
console.log("token",token)
  if (config && config.headers) {
    if (token) {
      config.headers["Authorization"] = "Token " + token;
    }
  }
  return config;
});

export { MCPHttpClient };



