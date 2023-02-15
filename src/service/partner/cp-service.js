
import { useQuery } from "react-query";
import { MicroMCPHttpClient } from "../service-micro-axios";
import { api } from "service/service-api";
 
const fetchCP = () => () => {
    return MicroMCPHttpClient.get(
      api.allCP,
    );
  };
  
  const useFetchCPList = () => {
    return useQuery(
      [api.allCP],
      fetchCP(),
      {
        select: data => data?.data?.data,
      }
    );
  };
  
  const fetchDashoardData = () => () => {
    return MicroMCPHttpClient.get(
      api.cpDashboardData,
    );
  };
  
  const useFetchDashboardData = () => {
    return useQuery(
      [api.cpDashboardData],
      fetchDashoardData(),
      {
        select: data => data?.data?.data,
      }
    );
  };

export {
  useFetchCPList,
  useFetchDashboardData
};
