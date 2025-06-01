export interface IResponseData {
  success: boolean;
  data: object | object[] | null;
  message?: string;
}

export interface IErrorResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>
}

export interface IGetListQueries {
  limit: number;
  offset: number;
  search?: string;
  year?: number;
  category?: number;
}

export interface StandardResponse<T = unknown> {
  success: boolean;
  data: T;
}
