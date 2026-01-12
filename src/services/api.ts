import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { SERVER_CONFIG } from '@/configs/config-env';
import { getAccessToken } from '@/utils/storage';

class Requester {
  requester: AxiosInstance;

  constructor() {
    const axiosInstance = axios.create({
      baseURL: SERVER_CONFIG.api_server_url,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    axiosInstance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.requester = axiosInstance;
  }

  handleSuccess(response: AxiosResponse) {
    return response.data;
  }

  handleError = (error: AxiosError) => {
    return Promise.reject(error);
  };

  redirectTo = (document: Document, path: string) => {
    document.location = path;
  };

  get(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<unknown> {
    return this.requester.get(url, Object.assign({}, { params }, config));
  }

  post(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<unknown> {
    return this.requester.post(url, data, config);
  }

  put(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<unknown> {
    return this.requester.put(url, data, config);
  }

  patch(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<unknown> {
    return this.requester.patch(url, data, config);
  }

  delete(url: string, config?: AxiosRequestConfig): Promise<unknown> {
    return this.requester.delete(url, config);
  }
}

const API = new Requester();

export default API;
