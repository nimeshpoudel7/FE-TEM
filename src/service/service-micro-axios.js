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
  // const token = TokenServiceUser.getAuthToken();
  // const token="f61de86cce0c6342618956512b99b0756b85bb23"
  const token ="37e7f889637d26dcbf16f13e131bedb77e9be1b8"

  if (config && config.headers) {
    if (token) {
      config.headers["Authorization"] = "Token " + token;
    }
  }
  return config;
});

export { MicroMCPHttpClient };

