export interface IExceptionResponse {
  statusCode?: number;
  statusMessage?: string;
  message: string;
  params?: Record<string, unknown> | Array<unknown>;
}
