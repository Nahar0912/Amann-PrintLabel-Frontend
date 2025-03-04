import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArticle, updateArticle } from "../services/articleService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticle();
        const article = data.find((article) => article.Id === parseInt(id));
        if (article) {
          setFormData(article);
        } else {
          toast.error("Article not found.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch article data.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-unused-vars
    const { Id, Article_No, ...updatedData } = formData;
    try {
      await updateArticle(id, updatedData);
      toast.success("Article updated successfully!");
      navigate("/admin");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update the article.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Article</h1>
        <form onSubmit={handleUpdate} className="space-y-5">
          {Object.keys(formData).map(
            (key) =>
              key !== "Id" &&
              key !== "Article_No" && (
                <div key={key} className="flex flex-col">
                  <label className="block font-medium text-gray-700 mb-1 text-base">
                    {key.replace(/_/g, " ")}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key] || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
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

export default UpdateArticle;
