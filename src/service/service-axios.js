import axios from "axios";

import TokenService from "./service-token";

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
  const token = TokenService.getToken();
  // const token="cf74411241b1074f71930abe3a116a4c572e54e0"

  if (config && config.headers) {
    if (token) {
      config.headers["Authorization"] = "Token " + token;
    }
  }
  return config;
});

export { MCPHttpClient };



