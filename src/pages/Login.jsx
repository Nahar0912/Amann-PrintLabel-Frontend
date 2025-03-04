import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from './../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    Email: "",
    PasswordHash: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError(err.message || "Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="absolute top-7 right-7">
            <Link to="/" className="btn  text-white bg-sky-900 rounded font-bold">
              Home
            </Link>
          </div>
        <h1 className="text-4xl font-bold text-center text-sky-950 mb-8">Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="PasswordHash"
              value={formData.PasswordHash}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-sky-900 px-4 py-3 rounded-lg font-semibold hover:bg-gray-900 focus:outline-none transition duration-300"
          >
            Login
          </button>
        </form>
        {/* <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Dont have an account?{" "}
            <Link to="/signup" className="text-gray-800 hover:text-gray-900 font-semibold">
              Sign Up
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
