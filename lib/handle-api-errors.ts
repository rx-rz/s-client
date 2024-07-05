export class APIError extends Error {
  constructor(
    public statusCode: number,
    public error: string,
    public error_type: string,
    message?: string
  ) {
    super(message || error);
    this.name = "APIError";
  }
}

export const handleAPIErrors = (error: unknown) => {
  if (error instanceof APIError) {
    return error;
  } else if (error instanceof Error) {
    return {
      statusCode: 500,
      error: error?.message,
      error_type: "Internal Server Error",
    };
  } else {
    return {
      statusCode: 500,
      error: "An unknown error occured",
      error_type: "Internal Server Error",
    };
  }
};
