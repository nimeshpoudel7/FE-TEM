
import {  useQuery } from "react-query";
import { api } from "./service-api";
import { MCPHttpClient } from "./service-axios";
import { MicroMCPHttpClient } from "./service-micro-axios";


const fetchInvestorList = (clientId) => () => {
  return MicroMCPHttpClient.get(
    api.investorListing,
    {
      params: { clientId: clientId },
    }
  );
};

const useFetchInvestorList = (clientId) => {
  console.log("hello")
  return useQuery(
    [api.investorListing],
    fetchInvestorList(clientId),
    {
      // enabled: !!clientId,
      select: data => data?.data?.data,
    }
  );
};



export {
  useFetchInvestorList
};
