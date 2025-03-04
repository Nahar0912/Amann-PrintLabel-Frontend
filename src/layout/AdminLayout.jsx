import { Link, useNavigate } from 'react-router-dom';
import Label from './../pages/Label';
import Article from './../pages/Article';
import User from './../pages/User';
import { useAuth } from './../hooks/useAuth';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); 

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  return (
    <div className="p-8">
      <div className="flex justify-end mb-4 space-x-4">
        <button
          onClick={handleLogout}
          className="btn text-white bg-emerald-500 rounded font-bold"
        >
          Logout
        </button>
        <Link to="/" className="btn text-white bg-sky-500 rounded font-bold">
          Home
        </Link>
      </div>
      <Label />
      <Article />
      <User />
    </div>
  );
};

export default AdminLayout;
