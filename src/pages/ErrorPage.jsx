import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ errorCode = "404", errorMessage = "Page Not Found" }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-9xl font-extrabold text-red-500">{errorCode}</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">{errorMessage}</h2>
      <p className="text-gray-600 mt-2">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or something went wrong.
      </p><br />
      <button
        onClick={handleGoBack}
        className="btn bg-green-500 text-white"
      >
        Go Back
      </button>
    </div>
  );
};

ErrorPage.propTypes = {
  errorCode: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default ErrorPage;
