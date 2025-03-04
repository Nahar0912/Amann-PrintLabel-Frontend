import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../services/userService";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        const user = data.find((user) => user.Id === parseInt(id, 10));
        if (user) {
          setFormData(user);
        } else {
          toast.error("User not found.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-unused-vars
    const { Id, Created, Modified, PasswordHash, ...updatedData } = formData;

    try {
      await updateUser(id, updatedData);
      toast.success("User updated successfully.");
      navigate("/admin");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update the user.");
    }
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit User</h1>
        <form onSubmit={handleUpdate} className="space-y-5">
          {Object.keys(formData).map(
            (key) =>
              key !== "Id" &&
              key !== "Created" &&
              key !== "Modified" &&
              key !== "PasswordHash" && (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {key.replace(/_/g, " ")}
                  </label>
                  {key !== "isActive" ? (
                    <input
                      type="text"
                      name={key}
                      value={formData[key] || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive || false}
                        onChange={handleChange}
                        className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Active</span>
                    </div>
                  )}
                </div>
              )
          )}

          <div className="flex justify-between">
            <button
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg text-base hover:bg-green-600 focus:ring-2 focus:ring-green-300"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg text-base hover:bg-gray-600 focus:ring-2 focus:ring-gray-300 ml-4"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
