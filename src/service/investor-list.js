
import {  useQuery } from "react-query";
import { api } from "./service-api";
import { MCPHttpClient } from "./service-axios";


const fetchInvestorList = (clientId) => () => {
  return MCPHttpClient.get(
    api.investorListing,
    {
      params: { clientId: clientId },
    }
  );
};

const useFetchInvestorList = (clientId) => {
  return useQuery(
    [api.investorListing],
    fetchInvestorList(clientId),
    {
      enabled: !!clientId,
      select: data => data?.data?.data,
    }
  );
};



export {
  useFetchInvestorList
};
