import React, { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { postRequest } from "../../../services/requests";
const MySwal = withReactContent(Swal);

const AddNews = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newsImage, setNewsImage] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [newsDate, setNewsDate] = useState("");
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const baseurl = "your_base_url_here";

  const handleFileChange = (setter) => (e) => {
    setter(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!newsImage) {
      newErrors.newsImage = "News Image is required";
    }
    if (!newsDate.trim()) {
      newErrors.newsDate = "News Date is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("newsImage", newsImage);
    formData.append("isFeatured", isFeatured);
    formData.append("newsDate", newsDate);

    try {
      setUploading(true);

      const res = await postRequest(
        "/admin/createNews",
        formData,
        "admin",
        true
      ).then((response) => {
        if (response.status) {
          Swal.fire({ icon: "success", title: "News added successfully" });
          setTitle("");
          setDescription("");
          setNewsImage(null);
          setIsFeatured(false);
          setNewsDate("");
        } else {
          Swal.fire({ icon: "error", title: response.message });
        }
      });
    } catch (error) {
      toast.error("An error occurred while adding the news.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="bg-white shadow-sm shadow-color-red p-10 md:w-1/2 lg:w-full mx-auto rounded">
        <h1 className="text-2xl font-bold mb-10 text-center font-hobo text-color-red">
          Add News
        </h1>
        <form className="w-full mx-auto" onSubmit={SubmitHandler}>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="title"
              className={`block mb-2 text-sm font-medium ${
                errors.title ? "text-red-500" : ""
              }`}
            >
              Title <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="title"
              className={`block w-full p-2 text-gray-900 border-2 border-gray-700 rounded-lg bg-gray-50 text-base focus:ring-color-red focus:border-color-red ${
                errors.title ? "border-red-500" : ""
              }`}
              placeholder=""
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
            {errors.title && (
              <p className="text-red-500 mt-1">{errors.title}</p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="description"
              className={`block mb-2 text-sm font-medium ${
                errors.description ? "text-red-500" : ""
              }`}
            >
              Description <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              name="description"
              className={`block w-full p-2 text-gray-900 border-2 border-gray-700 rounded-lg bg-gray-50 text-base focus:ring-color-red focus:border-color-red ${
                errors.description ? "border-red-500" : ""
              }`}
              placeholder=""
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
            {errors.description && (
              <p className="text-red-500 mt-1">{errors.description}</p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="newsDate"
              className={`block mb-2 text-sm font-medium ${
                errors.newsDate ? "text-red-500" : ""
              }`}
            >
              News Date <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="date"
              name="newsDate"
              className={`block w-full p-2 text-gray-900 border-2 border-gray-700 rounded-lg bg-gray-50 text-base focus:ring-color-red focus:border-color-red ${
                errors.newsDate ? "border-red-500" : ""
              }`}
              onChange={(e) => setNewsDate(e.target.value)}
              value={newsDate}
              required
            />
            {errors.newsDate && (
              <p className="text-red-500 mt-1">{errors.newsDate}</p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="newsImage"
              className={`block mb-2 text-sm font-medium ${
                errors.newsImage ? "text-red-500" : ""
              }`}
            >
              News Image <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="file"
              name="newsImage"
              className={`block w-full text-sm text-gray-900 border-2 border-gray-700 rounded-lg cursor-pointer bg-gray-50 ${
                errors.newsImage ? "border-red-500" : ""
              }`}
              aria-describedby="newsImage_help"
              id="newsImage"
              onChange={handleFileChange(setNewsImage)}
              accept="image/*"
              required
            />
            {errors.newsImage && (
              <p className="text-red-500 mt-1">{errors.newsImage}</p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="isFeatured"
              className={`block mb-2 text-sm font-medium`}
            >
              Is Featured
            </label>
            <input
              type="checkbox"
              name="isFeatured"
              className="block p-2"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
          </div>
          <div className="text-center mt-10">
            <button
              type="submit"
              className="bg-red-500 text-white px-10 py-2 rounded-full font-hobo hover:shadow-sm"
            >
              {uploading ? "Uploading..." : "Add News"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNews;
