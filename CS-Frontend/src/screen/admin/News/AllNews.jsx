import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getRequest, deleteRequest } from "../../../services/requests";

const MySwal = withReactContent(Swal);

const AllNews = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await getRequest("/admin/getAllNews", "admin");
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refresh]);

  const handleView = async (id) => {
    try {
      const response = await getRequest(`/admin/getNewsById/${id}`, "admin");
      setSelectedItem(response.data);
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteRequest(
            `/admin/deleteNews/${id}`,
            "admin"
          );
          MySwal.fire("Deleted!", response.message, "success");
          setRefresh(!refresh);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  let increment = 0;

  return (
    <>
      <h1 className="text-2xl mt-10 font-bold mb-4 text-center font-hobo text-color-red">
        All News
      </h1>

      {loading ? (
        <div className="flex justify-center items-start mt-20 h-screen">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-color-red"></div>
        </div>
      ) : (
        <div className="relative w-full d-block mx-auto overflow-x-auto shadow-md sm:rounded-lg bg-white">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3 w-28">
                  SR. NO.
                </th>
                <th scope="col" className="px-6 py-3">
                  News Image
                </th>
                <th scope="col" className="px-6 py-3">
                  News Title
                </th>
                <th scope="col" className="px-6 py-3">
                  News Description
                </th>
                <th scope="col" className="px-6 py-3">
                  News Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Featured
                </th>
                <th scope="col" className="px-6 py-3">
                  View
                </th>
                <th scope="col" className="px-6 py-3">
                  Update
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((news, index) => (
                <tr key={news._id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4">
                    <h6 className="font-bold">
                      {(increment = increment + 1)}.
                    </h6>
                  </td>
                  <th className="px-6 py-4 whitespace-nowrap">
                    <div className="h-20 w-24 rounded-md bg-blue-200 overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={news.newsImage}
                        alt=""
                      />
                    </div>
                  </th>
                  <td className="px-6 py-4">{news.title}</td>
                  <td className="px-6 py-4">{news.description}</td>
                  <td className="px-6 py-4">{new Date(news.newsDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{news.isFeatured ? "Yes" : "No"}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleView(news._id)}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      View
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to="#"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Update
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <MdDelete
                      className="text-2xl text-color-red cursor-pointer"
                      onClick={() => handleDelete(news._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">News Details</h2>
            <p>
              <strong>Title:</strong> {selectedItem.title}
            </p>
            <p>
              <strong>Description:</strong> {selectedItem.description}
            </p>
            <p>
              <strong>News Date:</strong> {new Date(selectedItem.newsDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Featured:</strong> {selectedItem.isFeatured ? "Yes" : "No"}
            </p>
            <img
              src={selectedItem.newsImage}
              alt={selectedItem.title}
              className="h-40 w-full object-cover mt-4"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AllNews;
