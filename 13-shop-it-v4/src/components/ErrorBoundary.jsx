import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

function getErrorMessage(error) {
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong.';
}

function ErrorBoundary() {
  const error = useRouteError();
  const errorMessage = getErrorMessage(error);

  return (
    <div className="container py-5">
      <div className="alert alert-danger shadow-sm" role="alert">
        <h3 className="mb-2">Something broke</h3>
        <p className="mb-3">{errorMessage}</p>
        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-primary btn-sm">Go Home</Link>
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
