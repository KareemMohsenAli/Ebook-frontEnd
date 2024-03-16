import axios from "../../api/axios.js";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CiCircleRemove } from "react-icons/ci";
import { schema } from "./form.validation.js";

function EbookForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [ebookData, setEbookData] = useState({
    title: "",
    author: "",
    category: "",
    coverImage: null,
    pdfFile: null,
  });
  const [coverPreview, setCoverPreview] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEbookData((prevEbookData) => ({
        ...prevEbookData,
        [e.target.name]: file,
      }));

      if (e.target.name === "coverImage") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCoverPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else if (e.target.name === "pdfFile") {
        setPdfPreview(file.name);
      }
    }
  };
  const handleRemoveFile = (fileType) => {
    if (fileType === "coverImage") {
      setEbookData((prevEbookData) => ({ ...prevEbookData, coverImage: null }));
      setCoverPreview(null);
    } else if (fileType === "pdfFile") {
      setEbookData((prevEbookData) => ({ ...prevEbookData, pdfFile: null }));
      setPdfPreview(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEbookData((prevEbookData) => ({
      ...prevEbookData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     // Prepare data for validation
  const validationData = {
    title: ebookData.title,
    author: ebookData.author,
    category: ebookData.category,
    coverImageType: ebookData.coverImage ? ebookData.coverImage.type : '',
    pdfFileType: ebookData.pdfFile ? ebookData.pdfFile.type : '',
  };
  // Perform validation
  const { error } = schema.validate(validationData);
  if (error) {
    toast.error(error.details[0].message);
    return;
  }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", ebookData.title);
    formData.append("author", ebookData.author);
    formData.append("categoryName", ebookData.category);
    formData.append("coverImage", ebookData.coverImage);
    formData.append("pdfFile", ebookData.pdfFile);

    try {
      // Replace URL with your actual endpoint
      await axios.post("/book/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setEbookData({
        title: "",
        author: "",
        category: "",
        coverImage: null,
        pdfFile: null,
      });
      setCoverPreview(null)
      setPdfPreview(null)
      toast.success("Signup successful, please login.");
    } catch (error) {
      toast.error(error.response?.data?.msgError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <h6 className="text-center flex justify-center py-3 text-4xl font-bold tracking-tight text-gray-900 px-4 hover:bg-blue-600 hover:translate-y-1 hover:scale-110 hover:text-white transition duration-700">
        Add Ebook
      </h6>
      <div className="flex flex-col justify-center items-center min-h-screen animate-kemo2">
        {/* Cover Image Upload */}
        <div className="m-3">
          <label className="italic">Cover Image</label> <br />
          {coverPreview ? (
            <div className="position-relative">
              <img
                src={coverPreview}
                alt="Cover preview"
                className="w-32 h-32 object-cover"
              />
              <button
                className="position-absolute top-0 right-0"
                type="button"
                onClick={() => handleRemoveFile("coverImage")}
              >
                <CiCircleRemove />
              </button>
            </div>
          ) : (
            <input
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              type="file"
              id="formFile"
              name="coverImage"
              accept="image/*"
              onChange={handleFileChange}
            />
          )}
        </div>
        {/* PDF File Upload */}
        <div className="m-3">
          <label className="italic">PDF File</label> <br />
          {pdfPreview ? (
            <div className="position-relative ">
              <p>{pdfPreview}</p>
              <button
                className="position-absolute -top-10 right-0"
                type="button"
                onClick={() => handleRemoveFile("pdfFile")}
              >
                <CiCircleRemove />
              </button>
            </div>
          ) : (
            <input
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              type="file"
              id="formFile"
              name="pdfFile"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          )}
        </div>

        {/* Other Fields */}
        <div className="m-3">
          <label className="italic">Title</label> <br />
          <input
            name="title"
            type="text"
            className="border border-[#1f2937] rounded outline-blue-900 px-2"
            value={ebookData.title}
            onChange={handleChange}
          />
        </div>
        <div className="m-3">
          <label className="italic">Author</label> <br />
          <input
            name="author"
            type="text"
            className="border border-[#1f2937] rounded outline-blue-900 px-2"
            value={ebookData.author}
            onChange={handleChange}
          />
        </div>
        <div className="m-3">
          <label className="italic">Category</label> <br />
          <input
            name="category"
            type="text"
            className="border border-[#1f2937] rounded outline-blue-900 px-2"
            value={ebookData.category}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <div className="m-3">
          <button
            className="border rounded-3xl bg-[#1f2937] text-white px-4 py-1 hover:bg-blue-600 hover:-translate-y-2 hover:scale-110 transition duration-500"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default EbookForm;
