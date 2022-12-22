export const createErrorResponse = (
  statusCode: number,
  type: string,
  param: string | undefined,
  message: string,
) => ({
  status_code: statusCode,
  type,
  param,
  message,
});
export const createSuccessResponse = (statusCode: number, data: Object) => ({
  status_code: statusCode,
  data,
});
