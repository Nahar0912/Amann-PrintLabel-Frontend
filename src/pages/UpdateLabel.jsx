import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLabels, updateLabel } from "../services/labelService";
import { toast } from "react-toastify";

const UpdateLabel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabel = async () => {
      try {
        const data = await getLabels();
        const label = data.find((label) => label.ID === parseInt(id));
        if (label) {
          setFormData(label);
        } else {
          toast.error("Label not found.");
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch label data.");
      } finally {
        setLoading(false);
      }
    };
    fetchLabel();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-unused-vars
    const { ID, CREATED_AT, UPDATED_AT, ...updatedData } = formData;
    try {
      await updateLabel(id, updatedData);
      toast.success("Label updated successfully.");
      navigate("/admin");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update the label.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full mx-auto p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Label</h1>
        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(formData).map((key) => (
            key !== "ID" && key !== "BAR_CODE" && key !== "CREATED_AT" && key !== "UPDATED_AT" && (
              <div key={key} className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2 break-words">
                  {key.replace(/_/g, " ")}:
                </label>
                {key === "DATE" ? (
                  <input
                    type="datetime-local"
                    name={key}
                    value={formatDate(formData[key])}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                  />
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={formData[key] || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                    placeholder={`Enter ${key.replace(/_/g, " ")}`}
                  />
                )}
              </div>
            )
          ))}
          <div className="flex justify-between col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="ml-4 w-full bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateLabel;
