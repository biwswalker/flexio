interface APIResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
  code: number;
}
