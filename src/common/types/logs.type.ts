export type Logs = {
  method: string;
  url: string;
  timestamp: string;
  executionTime: string;
  statusCode: number;
  error?: {
    errorMessage: string;
    errorName?: string;
  };
};
