import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();
  // If there's no route error (component used directly), treat as 404
  const is404 = error ? (isRouteErrorResponse(error) && error.status === 404) : true;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        {is404 ? (
          <>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Oops!</h1>
            <p className="text-gray-700 mb-4">Sorry, an unexpected error has occurred.</p>
            <p className="text-gray-500 text-sm">
              {(error as Error)?.message || 'An error occurred'}
            </p>
          </>
        )}
        <a 
          href="/"
          className="mt-6 inline-block bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          Go back home
        </a>
      </div>
    </div>
  );
};

export default ErrorBoundary;