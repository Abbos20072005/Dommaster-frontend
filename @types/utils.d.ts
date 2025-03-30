type ApiRequestConfig = import('axios').AxiosRequestConfig;

type RequestConfig<Data = undefined> = Data extends undefined
  ? { config?: import('axios').AxiosRequestConfig }
  : { data: Data; config?: import('axios').AxiosRequestConfig };

interface ApiResponse<T = unknown> {
  message: string;
  result: T;
}
