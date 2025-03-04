import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../services/articleService";
import { toast } from "react-toastify";

const AddArticle = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Article_No: "",
    Tex_No: "",
    Length: "",
    Cone_Round_Tex: "",
    No_of_Cones_inside_the_Carton: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createArticle(formData);
      toast.success("Article created successfully.");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create article. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Article</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              <label className="block font-medium text-gray-700 mb-1 text-base">
                {key.replace(/_/g, " ")}
              </label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          ))}
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg text-base hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
            >
              Create
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

export default AddArticle;
