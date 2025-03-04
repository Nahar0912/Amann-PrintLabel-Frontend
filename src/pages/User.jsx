import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser, deleteUser } from "../services/userService";
import { toast } from "react-toastify";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUser();
        console.log(data); 
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((user) => user.Id !== userId));
      toast.success(`User with ID ${userId} deleted successfully.`);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to delete user with ID ${userId}.`);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading users...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">User Information</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              {Object.keys(users[0] || {}).map((key) => (
                <th key={key} className="px-4 py-2 border-b border-gray-300 text-left">
                  {key.replace(/_/g, " ")}
                </th>
              ))}
              <th className="px-4 py-2 border-b border-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.Id} className="hover:bg-gray-50">
                {Object.keys(user).map((key, index) => (
                  <td key={index} className="px-4 py-2 border-b border-gray-300">
                    {key === 'isActive' ? (user[key] ? 'Active' : 'Inactive') : user[key] || 'N/A'}
                  </td>
                ))}
                <td className="px-4 py-2 border-b border-gray-300">
                  <Link
                    to={`/update-user/${user.Id}`} 
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.Id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
