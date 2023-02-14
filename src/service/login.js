
import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "./service-api";
import { MCPHttpClient } from "./service-axios";
import { toastFail } from "components/toast";
import { toastSuccess } from "components/toast";

const fetchClientUser = (clientId) => () => {
  return MCPHttpClient.get(
    api.login,
    {
      params: { clientId: clientId },
    }
  );
};

const useFetchClientUser = (clientId) => {
  return useQuery(
    [api.login, clientId],
    fetchClientUser(clientId),
    {
      select: data => data?.data?.data,
    }
  );
};

const saveClientUser = () => {
  return MCPHttpClient.post(
    api.login,
    {}
  );
};

const useSaveClientUser = () => {
  const queryClient = useQueryClient();
  return useMutation(saveClientUser, {
    onError: (error) => {
      toastFail(error?.response?.data?.message ?? "");
    },
    onSuccess: success => {
      toastSuccess(success?.data?.message);
      queryClient.invalidateQueries(api.clientUser.clientUser);
    },
  });
};


export {
  useFetchClientUser,
  useSaveClientUser,
};
