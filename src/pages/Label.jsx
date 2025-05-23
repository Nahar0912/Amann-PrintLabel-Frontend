import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLabels, deleteLabel } from "../services/labelService";
import { toast } from "react-toastify";
import moment from "moment";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.css";

const Label = () => {
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const data = await getLabels();
        setLabels(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch label data.");
      } finally {
        setLoading(false);
      }
    };
    fetchLabels();
  }, []);

  useEffect(() => {
    if (!loading && labels.length > 0) {
      setTimeout(() => {
        $('#labelTable').DataTable({
          responsive: true,
          autoWidth: false,
          destroy: true, 
        });
      }, 0);
    }
  }, [loading, labels]);

  const handleDelete = async (id) => {
    try {
      await deleteLabel(id);
      setLabels((prev) => prev.filter((label) => label.ID !== id));
      toast.success(`Label with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to delete label with ID ${id}.`);
    }
  };

  const formatValue = (value) => {
    if (
      typeof value === "string" && value.includes("T") && moment(value, moment.ISO_8601, true).isValid()
    ) {
      return moment(value).format("DD/MM/YYYY hh:mm a");
    }
    return value;
  };
  
  if (loading)
    return <p className="text-center text-gray-500">Loading labels...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Label Information</h1>
      <div className="overflow-x-auto w-full">
        <table
          id="labelTable"
          className="display table-auto border border-gray-300 bg-white shadow-md rounded-lg w-full"
        >
          <thead>
            <tr className="bg-gray-100">
              {Object.keys(labels[0] || {}).map((key) => (
                <th
                  key={key}
                  className="border-b border-gray-300 text-left max-w-[150px] break-words"
                >
                  {key}
                </th>
              ))}
              <th className="border-b border-gray-300 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {labels.map((label) => (
              <tr key={label.ID} className="hover:bg-gray-50">
                {Object.values(label).map((value, index) => (
                  <td
                    key={index}
                    className="border-b border-gray-300 max-w-[100px] break-words"
                  >
                    {formatValue(value)}
                  </td>
                ))}
                <td className="border-b border-gray-300">
                  <Link
                    to={`/update-label/${label.ID}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(label.ID)}
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

export default Label;
