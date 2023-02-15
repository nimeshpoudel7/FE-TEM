
import { useMutation, useQuery, useQueryClient } from "react-query";
import { MicroMCPHttpClient } from "../service-micro-axios";
import { api } from "service/service-api";
import { UserHttpClient } from "service/login-user-axios";
import { toastFail } from "components/toast";
import { toastSuccess } from "components/toast";
 
const fetchInvestor = () => () => {
    return MicroMCPHttpClient.get(
      api.allInvestorList,
    );
  };
  
  const useFetchInvestorList = () => {
    return useQuery(
      [api.allInvestorList],
      fetchInvestor(),
      {
        select: data => data?.data?.data,
      }
    );
  };

  const sendPayment = (requestData) => {
    return UserHttpClient.post(
      api.sendPaymentLink,
      requestData
    );
  };
  
  const useSendPayment = () => {
    const queryClient = useQueryClient();
    return useMutation(sendPayment, {
      onError: (error) => {
        toastFail(error?.response?.data?.message ?? "");
      },
      onSuccess: success => {
        if(success?.data?.code===1){
        toastSuccess(success?.data?.message);
        // queryClient.invalidateQueries(api.checklist);
        }else{
          toastFail(success?.data?.message);
        }
        
      },
    });
  };




  

export {
  useFetchInvestorList,
  useSendPayment
};
