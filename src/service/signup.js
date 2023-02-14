
import { useMutation, useQueryClient } from "react-query";
import { api } from "./service-api";
import { MCPHttpClient } from "./service-axios";
import { toastFail } from "components/toast";
import { toastSuccess } from "components/toast";
import TokenService from "./service-token";



const signUpMCP = (requestData) => {
  return MCPHttpClient.post(
    api.signup,
    requestData
  );
};

const useSignUpMCP = () => {
  const queryClient = useQueryClient();
  return useMutation(signUpMCP, {
    onError: (error) => {
      toastFail(error?.response?.data?.message ?? "");
    },
    onSuccess: success => {
      if(success?.data?.code===1){
        TokenService.setToken(success?.data?.response?.token)
      toastSuccess(success?.data?.message);
      queryClient.invalidateQueries(api.signup);
      }else{
        toastFail(success?.data?.message);
      }
      
    },
  });
};

const sendOTP = (requestData) => {
  return MCPHttpClient.post(
    api.otp,
    requestData
  );
};

const useSendOTP = () => {
  const queryClient = useQueryClient();
  return useMutation(sendOTP, {
    onError: (error) => {
      toastFail(error?.response?.data?.message ?? "");
    },
    onSuccess: success => {
      if(success?.data?.code===1){
      toastSuccess(success?.data?.message);
      queryClient.invalidateQueries(api.otp);
      }else{
        toastFail(success?.data?.message);
      }
      
    },
  });
};





export {
  useSignUpMCP,
  useSendOTP
};
