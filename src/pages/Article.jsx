import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getArticle, deleteArticle } from "../services/articleService";
import { toast } from "react-toastify";
import moment from "moment";
import $ from "jquery";
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/dataTables.dataTables.css';


const Article = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticle();
        setArticles(data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch article data.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    if (!loading && articles.length > 0) {
      $(tableRef.current).DataTable();
    }
    return () => {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, [articles, loading]);

  const handleDelete = async (articleNo) => {
    try {
      await deleteArticle(articleNo);
      setArticles((prev) => prev.filter((article) => article.Id !== articleNo));
      toast.success(`Article with article number ${articleNo} deleted successfully.`);
    } catch (error) {
      console.log(error);
      toast.error(`Failed to delete article with article number ${articleNo}.`);
    }
  };

  const formatValue = (value) => {
      if (typeof value === "string" && moment(value, moment.ISO_8601, true).isValid()) {
        return moment(value).format("DD/MM/YYYY hh:mm a");
      }
      return value;
    };

  if (loading) return <p className="text-center text-gray-500">Loading articles...</p>;

  return (
    <div className="p-8 relative">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-2xl font-bold">Article Information</h1>
      </div>
      <Link
        to="/create-article"
        className="absolute top-8 right-8 bg-green-500 text-white font-bold px-4 py-2 rounded hover:bg-green-600"
      >
        Create New Article
      </Link>

      <div className="overflow-x-auto">
        <table ref={tableRef} className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg display">
          <thead>
            <tr className="bg-gray-100">
              {Object.keys(articles[0] || {}).map((key) => (
                <th key={key} className="px-4 py-2 border-b border-gray-300 text-left">
                  {key.replace(/_/g, " ")}
                </th>
              ))}
              <th className="px-4 py-2 border-b border-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.Article_No} className="hover:bg-gray-50">
                {Object.values(article).map((value, index) => (
                  <td key={index} className="px-4 py-2 border-b border-gray-300">
                    {formatValue(value)}
                  </td>
                ))}
                <td className="px-4 py-2 border-b border-gray-300">
                  <Link
                    to={`/update-article/${article.Id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(article.Id)}
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

export default Article;