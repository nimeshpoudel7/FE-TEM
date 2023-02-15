
import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "./service-api";
import { MCPHttpClient } from "./service-axios";
import { toastFail } from "components/toast";
import { toastSuccess } from "components/toast";
import { toFormData } from "./form-data";

const fetchUserDetails = () => () => {
  return MCPHttpClient.get(
    api.user,
  );
};

const useFetchUserDetails = () => {
  return useQuery(
    [api.user],
    fetchUserDetails(),
    {
      select: data => data?.data?.response,
    }
  );
};


const postPin = (requestData) => {
    return MCPHttpClient.post(
      api.pinCode,
      requestData
    );
  };
  
  const usePostPin = () => {
    const queryClient = useQueryClient();
    return useMutation(postPin, {
      onError: (error) => {
        toastFail("Please enter a valid pin code");
      },
      onSuccess: success => {
        if(success.data.response.Status=="Success"){
            toastSuccess("Pin successfully fetched");
            queryClient.invalidateQueries(api.pinCode);
        }else{
            toastFail("Please enter a valid pin code");

        }
    
      },
    });
  };

const fetchPersonalDetails = (userId) => () => {
    return MCPHttpClient.get(
      api.personalDetails,
      {
        params: { user_id: userId },
      }
    );
  };
  
  const useFetchPersonalDetails = (userId) => {
    return useQuery(
      [api.personalDetails, userId],
      fetchPersonalDetails(userId),
      {
        select: data => data?.data?.response,
      }
    );
  };


  
const postPersonalDetails = (requestData) => {
    return MCPHttpClient.post(
      api.personalDetails,
      requestData
    );
  };
  
  const usePostPersonalDetails = () => {
    const queryClient = useQueryClient();
    return useMutation(postPersonalDetails, {
      onError: (error) => {
        toastFail("Please enter a valid pin code");
      },
      onSuccess: success => {
        if(success?.data?.code===1){
          toastSuccess(success?.data?.message);
          queryClient.invalidateQueries(api.personalDetails);
          queryClient.invalidateQueries(api.checklist);
          }else{
            toastFail(success?.data?.message);
          }
    
      },
    });
  };
  
  const postBankDetails = (requestData) => {
    return MCPHttpClient.post(
      api.bankDetails,
      requestData
    );
  };
  
  const usePostBankDetails = () => {
    const queryClient = useQueryClient();
    return useMutation(postBankDetails, {
      onError: (error) => {
        toastFail("Something went wrong.Please try again later");
      },
      onSuccess: success => {
        if(success?.data?.code===1){
          toastSuccess(success?.data?.message);
          queryClient.invalidateQueries(api.bankDetails);
          queryClient.invalidateQueries(api.checklist);
          }else{
            toastFail(success?.data?.message);
          }
    
      },
    });
  };


  const postCompanyDetails = (requestData) => {
    return MCPHttpClient.post(
      api.comapanyDetails,
      requestData
    );
  };
  
  const usePostCompanyDetails = () => {
    const queryClient = useQueryClient();
    return useMutation(postCompanyDetails, {
      onError: (error) => {
        toastFail("Something went wrong.Please try again later");
      },
      onSuccess: success => {
        if(success?.data?.code===1){
          toastSuccess(success?.data?.message);
          queryClient.invalidateQueries(api.comapanyDetails);
          }else{
            toastFail(success?.data?.message);
          }
    
      },
    });
  };
  const postDocumentDetails = (requestData,userId) => {
    return MCPHttpClient.post(
      api.documentDetails,
      toFormData(requestData),
      {
        params: { user_id: "G6OAFK5HV5" },
      },
     
    );
  };
  
  const usePostDocumentDetails = () => {
    const queryClient = useQueryClient();
    return useMutation(postDocumentDetails, {
      onError: (error) => {
        toastFail("Something went wrong.Please try again later");
      },
      onSuccess: success => {
        if(success?.data?.code===1){
          toastSuccess(success?.data?.message);
          queryClient.invalidateQueries(api.documentDetails);
          queryClient.invalidateQueries(api.checklist);
          
          }else{
            toastFail(success?.data?.message);
          }
    
      },
    });
  };

  


  
  // bank

  
const fetchBankDetails = (userId) => () => {
    return MCPHttpClient.get(
      api.bankDetails,
      {
        params: { user_id: userId },
      }
    );
  };
  
  const useFetchBankDetails = (userId) => {
    return useQuery(
      [api.bankDetails, userId],
      fetchBankDetails(userId),
      {
        select: data => data?.data?.response,
      }
    );
  };

    
const fetchDocumentDetails = (userId) => () => {
    return MCPHttpClient.get(
      api.documentDetails,
      {
        params: { user_id: userId },
      }
    );
  };
  
  const useFetchDocumentDetails = (userId) => {
    return useQuery(
      [api.documentDetails, userId],
      fetchDocumentDetails(userId),
      {
        select: data => data?.data?.response,
      }
    );
  };
  
  const fetchChecklist = () => () => {
    return MCPHttpClient.get(
      api.checklist)
  };
  
  const useFetchChecklistDetails = () => {
    return useQuery(
      [api.checklist],
      fetchChecklist(),
      {
        select: data => data?.data?.response,
      }
    );
  };





export {
    useFetchUserDetails,
    useFetchPersonalDetails,
  useFetchBankDetails,
  usePostPin,
  useFetchDocumentDetails,
  usePostPersonalDetails,
  usePostBankDetails,
  usePostCompanyDetails,
  usePostDocumentDetails,
  useFetchChecklistDetails


};
