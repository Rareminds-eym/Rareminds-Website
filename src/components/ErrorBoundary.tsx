import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';

const ErrorBoundary = () => {
  const error = useRouteError();
  // If there's no route error (component used directly), treat as 404
  const is404 = error ? (isRouteErrorResponse(error) && error.status === 404) : true;

  if (is404) {
    return (
      <ErrorComponent
        title="404 - Page Not Found"
        message="The page you're looking for doesn't exist or has been moved."
      />
    );
  }

  return (
    <ErrorComponent
      title="Oops! Something went wrong"
      message={(error as Error)?.message || 'An unexpected error has occurred.'}
    />
  );
};

export default ErrorBoundary;