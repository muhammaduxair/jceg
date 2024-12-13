type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions extends RequestInit {
  data?: object | FormData;
  uploadingFile?: boolean;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = "http://127.0.0.1:8000/") {
    this.baseUrl = baseUrl;
  }

  private async fetchJson<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
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

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return Promise.reject(
        new Error(errorData.message || response.statusText)
      );
    }

    return response.json();
  }

  async get<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    return this.fetchJson(endpoint, { ...options, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    data: object | FormData,
    options: FetchOptions = {}
  ): Promise<T> {
    const isFormData = data instanceof FormData;
    return this.fetchJson(endpoint, {
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
  ): Promise<T> {
    const isFormData = data instanceof FormData;
    return this.fetchJson(endpoint, {
      ...options,
      method: "PUT",
      data,
      uploadingFile: isFormData,
    });
  }

  async delete<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    return this.fetchJson(endpoint, { ...options, method: "DELETE" });
  }
}

const apiService = new ApiService();
export default apiService;
