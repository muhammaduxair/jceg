import { ApiResponse, FetchOptions } from "./interface";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = "http://localhost:8000/api/v1/") {
    this.baseUrl = baseUrl;
  }

  private async fetchJson<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<ApiResponse<T>> {
    const { data, headers, uploadingFile, ...customConfig } = options;
    const method = customConfig.method as HttpMethod;

    let customHeaders: HeadersInit = headers || {};

    if (!uploadingFile) {
      customHeaders = {
        ...headers,
        "Content-Type": "application/json",
      };
    } else {
      customHeaders = {
        ...headers,
      };
    }

    const config: RequestInit = {
      method,
      ...customConfig,
      headers: customHeaders,
    };

    if (data) {
      if (uploadingFile) {
        config.body = data as FormData;
      } else {
        config.body = JSON.stringify(data);
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          isSuccess: false,
          data: null,
          error: errorData.message || response.statusText,
        };
      }

      const responseData: T = await response.json();
      return {
        isSuccess: true,
        data: responseData,
      };
    } catch (error) {
      return {
        isSuccess: false,
        data: null,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  }

  async get<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<ApiResponse<T>> {
    return this.fetchJson<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    data: object | FormData,
    options: FetchOptions = {}
  ): Promise<ApiResponse<T>> {
    const isFormData = data instanceof FormData;
    return this.fetchJson<T>(endpoint, {
      ...options,
      method: "POST",
      data,
      uploadingFile: isFormData,
    });
  }

  async put<T>(
    endpoint: string,
    data: object | FormData,
    options: FetchOptions = {}
  ): Promise<ApiResponse<T>> {
    const isFormData = data instanceof FormData;
    return this.fetchJson<T>(endpoint, {
      ...options,
      method: "PUT",
      data,
      uploadingFile: isFormData,
    });
  }

  async delete<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<ApiResponse<T>> {
    return this.fetchJson<T>(endpoint, { ...options, method: "DELETE" });
  }
}

const apiService = new ApiService();
export default apiService;
