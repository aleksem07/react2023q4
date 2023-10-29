export type ErrorBoundaryProps = {
  children: React.ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
};
