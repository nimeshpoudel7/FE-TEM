
import { useQuery } from "react-query";
import { MicroMCPHttpClient } from "../service-micro-axios";
import { api } from "service/service-api";
 
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

export {
  useFetchInvestorList
};
