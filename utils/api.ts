import axios, { AxiosRequestConfig, Method, AxiosInstance } from 'axios';

export class AxiosRequestBuilder<T = any> {
  private config: AxiosRequestConfig = {};
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  baseUrl(baseURL: string): this {
    this.config.baseURL = baseURL;
    return this;
  }

  url(url: string): this {
    this.config.url = url;
    return this;
  }

  method(method: Method): this {
    this.config.method = method;
    return this;
  }

  params(params: Record<string, any>): this {
    this.config.params = params;
    return this;
  }

  data(data: any): this {
    this.config.data = data;
    return this;
  }

  headers(headers: Record<string, string>): this {
    this.config.headers = {
      ...this.config.headers,
      ...headers,
    };
    return this;
  }

  auth(token: string): this {
    return this.headers({
      Authorization: `Bearer ${token}`,
    });
  }

  authFrom(getTokenFn: () => string | undefined): this {
    const token = getTokenFn();
    if (token) {
      this.auth(token);
    }
    return this;
  }

  signal(signal: AbortSignal): this {
    this.config.signal = signal;
    return this;
  }

  timeout(ms: number): this {
    this.config.timeout = ms;
    return this;
  }

  async send() {
    return this.axiosInstance.request<T>(this.config);
  }
}
