import { useState } from 'react';
import { createUser, getUser } from '../services/userService'; 
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    Username: '',
    Email: '',
    PasswordHash: '',
    Role: 'Admin', 
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { Username, Email, PasswordHash } = formData;
    let errors = [];

    if (Username.length < 3 || Username.length > 20) {
      errors.push('Username must be between 3 and 20 characters.');
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(Email)) {
      errors.push('Please enter a valid email address.');
    }

    // Password validation: must contain at least one number, one uppercase letter, and be 6-20 characters long
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,10}$/;
    if (!passwordPattern.test(PasswordHash)) {
      errors.push(
        'Password must be between 6 and 20 characters and contain at least one number and one uppercase letter.'
      );
    }

    return errors;
  };

  const checkEmailExists = async (email) => {
    setIsCheckingEmail(true);
    try {
      const users = await getUser();
      const emailExists = users.some((user) => user.Email === email);
      setIsCheckingEmail(false);
      return emailExists;
    } catch (error) {
      console.error('Error checking email:', error);
      setErrorMessage('Error checking email existence. Please try again.');
      setIsCheckingEmail(false);
      return true; 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrorMessage(validationErrors.join(' '));
      return;
    }

    const emailExists = await checkEmailExists(formData.Email);
    if (emailExists) {
      setErrorMessage('Email already exists. Please use a different email.');
      return;
    }

    try {
      const response = await createUser(formData);
      console.log('Response from server:', response); 
      setSuccessMessage('User created successfully!');
      setFormData({
        Username: '',
        Email: '',
        PasswordHash: '',
        Role: 'Admin',
      });
    } catch (error) {
      console.error(error);
      setErrorMessage('Error creating user. Please try again.');
    }
  };

  return (
    <div className="relative p-8">
      <div className="flex justify-end mb-4 gap-3">
        <Link to="/" className="btn btn-neutral rounded font-bold">
          Home
        </Link>
      </div>

      <div className="max-w-md mx-auto mt-20 p-6 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        {/* Error message */}
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        {/* Success message */}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="Username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="Username"
              name="Username"
              value={formData.Username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="Email"
              name="Email"
              value={formData.Email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="PasswordHash" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="PasswordHash"
              name="PasswordHash"
              value={formData.PasswordHash}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
              minLength="6"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none ${isCheckingEmail ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isCheckingEmail}
          >
            {isCheckingEmail ? 'Checking...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
