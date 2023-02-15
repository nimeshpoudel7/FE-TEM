
import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "./service-api";
import { UserHttpClient } from "./login-user-axios";
import { toastFail } from "components/toast";
import { toastSuccess } from "components/toast";
import TokenService from "./user-service";



// const signUpMCP = (requestData) => {
//   return UserHttpClient.post(
//     api.signup,
//     requestData
//   );
// };

// const useSignUpMCP = () => {
//   const queryClient = useQueryClient();
//   return useMutation(signUpMCP, {
//     onError: (error) => {
//       toastFail(error?.response?.data?.message ?? "");
//     },
//     onSuccess: success => {
//       if(success?.data?.code===1){
//         TokenService.setToken(success?.data?.response?.token)
//         TokenService.setUserDetails(success?.data?.response)
//         console.log(success?.data)
//       toastSuccess(success?.data?.message);
//       queryClient.invalidateQueries(api.signup);
//       }else{
//         console.log(success?.data)
//         toastFail(success?.data?.message);
//       }
      
//     },
//   });
// };

const sendOTP = (requestData) => {
  return UserHttpClient.post(
    api.otp,
    requestData
  );
};

const useLoggedInUserOTP = () => {
  const queryClient = useQueryClient();
  return useMutation(sendOTP, {
    onError: (error) => {
      toastFail(error?.response?.data?.message ?? "");
    },
    onSuccess: success => {
      if(success?.data?.code===1){
        if(success?.data?.response?.token){
          TokenService.setAuthToken(success?.data?.response?.token)
          TokenService.setAutUserDetails(success?.data?.response)
          queryClient.invalidateQueries(api.user);

        }

      toastSuccess(success?.data?.message);
      queryClient.invalidateQueries(api.otp);
      }else{
        toastFail(success?.data?.message);
      }
      
    },
  });
};


const passwordLogin = (requestData) => {
  return UserHttpClient.post(
    api.managerLogin,
    requestData
  );
};

const usePasswordLogin = () => {
  const queryClient = useQueryClient();
  return useMutation(passwordLogin, {
    onError: (error) => {
      toastFail(error?.response?.data?.message ?? "");
    },
    onSuccess: success => {
      if(success?.data?.code===1){
        if(success?.data?.response?.token){
          TokenService.setAuthToken(success?.data?.response?.token)
          TokenService.setAutUserDetails(success?.data?.response)
        }

      toastSuccess(success?.data?.message);
      queryClient.invalidateQueries(api.user);
      }else{
        toastFail(success?.data?.message);
      }
      
    },
  });
};

const fetchUserDetails = () => () => {
  return UserHttpClient.get(
    api.user,
  );
};

const useFetchUserDetails = (userId) => {
  return useQuery(
    [api.user],
    fetchUserDetails(userId),
    {
      select: data => data?.data?.response,
    }
  );
};


export {
  usePasswordLogin,
  useLoggedInUserOTP,
  useFetchUserDetails
};
