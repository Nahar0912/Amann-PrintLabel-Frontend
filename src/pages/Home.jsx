import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createLabel } from '../services/labelService';
import { useAuth } from './../hooks/useAuth';

const Home = () => {
  const { isLoggedIn, logout } = useAuth();
  const [formData, setFormData] = useState({ barcode: '', quantity: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { barcode, quantity } = formData;

    const barcodePattern = /^\d{1,8}-\d{1,8}-\d{1,8}-\d{1,8}$/;
    setError('');
    setSuccess('');
    
    if (!barcode.trim() || !quantity.trim()) {
      setError('Please fill in both fields.');
      return;
    }
    if (!barcodePattern.test(barcode)) {
      setError('Invalid barcode format. It should be XXXX-XXXX-XXXX-XXXX (8-8-8-8 digits).');
      return;
    }
    if (isNaN(quantity) || Number(quantity) <= 0) {
      setError('Quantity must be a positive number.');
      return;
    }

    try {
      setIsSubmitting(true);
      const newLabel = await createLabel({ BAR_CODE: barcode, ORDER_QUANTITY: quantity });
      setSuccess('Label successfully added to the database.');
      setFormData({ barcode: '', quantity: '' });
      console.log('Label added:', newLabel);
    } catch (err) {
      setError('Failed to add label. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="bg-cover h-screen" style={{ backgroundImage: "url(images/Amann.jpg)" }}>
      <div className="flex justify-between">
        <div className="ml-4 md:ml-14">
          <img className="sm:h-24 md:h-28 lg:h-32 xl:h-48" src="images/AMANN LOGO.jpg" alt="AMANN Logo"/>
        </div>
        <div className='flex gap-3 p-8'>
        {/* <Link to="/signup" className="btn text-white bg-orange-400 rounded font-bold">Signup</Link> */}
          {!isLoggedIn ? (
            <Link to="/login" className="btn text-white bg-emerald-500 rounded font-bold">Login</Link>
          ) : (
            <button onClick={handleLogout} className="btn text-white bg-emerald-500 rounded font-bold">Logout</button>
          )}
          <Link to="/admin" className="btn text-white bg-sky-500 rounded font-bold">Admin</Link>
        </div>
      </div>
      <div className="hero min-h-[60vh]">
        <div className="card bg-base-100 w-full max-w-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body gap-5">
            <div className="form-control">
              <h1 className="font-bold text-4xl text-center">Print Label</h1>
            </div>
            <div className="form-control">
              <label className="label flex items-center">
                <span className="label-text text-2xl font-bold">
                  Barcode <span className="text-red-500 ml-1">*</span>
                </span>
              </label>
              <input
                type="text"
                name="barcode"
                placeholder="Scan Your Barcode"
                className="input input-bordered py-4 px-4 text-lg rounded-lg"
                value={formData.barcode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label flex items-center">
                <span className="label-text text-2xl font-bold">
                  Quantity <span className="text-red-500 ml-1">*</span>
                </span>
              </label>
              <input
                type="text"
                name="quantity"
                placeholder="Enter Your Quantity"
                className="input input-bordered py-4 px-4 text-lg rounded-lg"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            {success && <div className="text-green-500 text-center mb-4">{success}</div>}
            <div className="form-control mt-6">
              <button className={`btn btn-success font-bold text-white ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
