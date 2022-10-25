import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import auth from "@/services/auth";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  if (auth.accessToken) {
    if (config.headers) {
      config.headers["Authorization"] = `bearer ${auth.accessToken}`;
    }
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  // 401 bad token
  if (error.response && error.response.status === 401) {
    if (!error.response.config.url?.endsWith("logout")) {
      auth.logout().then();
    }
  }

  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
