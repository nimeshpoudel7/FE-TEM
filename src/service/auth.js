import { toastFail,toastSuccess } from "components/toast";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

import { api } from "./service-api";
import { MCPHttpClient } from "./service-axios";
import TokenService from "./service-token";
export const authTokenKey = "authToken";
const authTokenDetails = "authTokenDetails";

const initLogout = (queryClient) => {
  try {
    queryClient.setQueryData(authTokenKey, () => false);
    TokenService.clearToken();
    return Promise.resolve(true);
  } catch (error) {
    return Promise.resolve(false);
  }
};

const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(() => initLogout(queryClient), {
    onSuccess: () => {
      queryClient.clear();
      toastSuccess("Logged out Succesfully");
    },
  });
};

const initLogin = (loginData) => {
  return MCPHttpClient.post(api.login, {"password"
    : 
    "ldcwm@123",
    "username"
    : 
    "mansi.j@lendenclub.ldc"});
};

const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(initLogin, {
    onSuccess: response => {
      const tokens = {
        token: response.response.token,
      };
      TokenService.setToken(tokens);
      queryClient.setQueryData(authTokenKey, () => true);
    },
    onError: error => {
      toastFail(
        error.response?.data?.message ??
        error.response?.data?.error ??
          "Login failed !"
      );
    },
  });
};

const checkAuthentication = () => {
  if (TokenService.isAuthenticated()) {
    return true;
  }
  return null;
};

/**
 * Check if user is authenticated
 * @returns boolean
 */
const useAuthentication = () => {
  const queryClient = useQueryClient();

  return useQuery(authTokenKey, checkAuthentication, {
    onSuccess: () => {
      const tokenDetails = TokenService.getTokenDetails();
      if (tokenDetails) {
        queryClient.setQueryData(authTokenDetails, {
          ...tokenDetails,
        });
      }
    },
  });
};

const useLoginTokenDetailQuery = () => {
  return useQuery(authTokenDetails);
};

export {
  useAuthentication,
  useLoginMutation,
  useLoginTokenDetailQuery,
  useLogoutMutation,
};
