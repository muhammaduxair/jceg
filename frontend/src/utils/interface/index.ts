export interface IGenerateEmailResponse {
  subject: string;
  email: string;
  recipient?: string;
}

export interface FetchOptions extends RequestInit {
  data?: object | FormData;
  uploadingFile?: boolean;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  data: T | null;
  error?: string;
}
