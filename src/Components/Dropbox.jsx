import Navbar from "./Navbar";
import React, { useState } from "react";

export default function Dropbox() {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    // Convert the FileList into an Array
    setFiles((prevFiles) => [...prevFiles, ...Array.from(e.target.files)]);

  };

  return (
    <div>
      <Navbar />
      <div className="h-screen bg-base-300 flex justify-center items-center">
        <div className="card w-full sm:w-3/4 lg:w-1/2 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-1">Upload Your Files</h2>
            <p className="text-xs text-gray-500 mb-4">
              Files should be of format .mp4, .avi, .mov or .mkv
            </p>

            {/* Title Input */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Document Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter document title"
                className="input input-bordered w-full rounded-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Description TextArea with Smooth Border */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered textarea-primary w-full rounded-lg"
                placeholder="Enter description of files"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* File Upload Area */}
            <div className="mt-4 w-full flex justify-center">
              <label
                htmlFor="file-upload"
                className="border-2 border-dashed border-gray-400 bg-base-200 rounded-xl p-10 w-full max-w-xs flex flex-col items-center justify-center cursor-pointer"
              >
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                />
                {files.length > 0 ? (
                  <p className="text-sm text-gray-500">
                    {files.length} file{files.length > 1 && "s"} selected
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    Drag & Drop your files here or click to upload
                  </p>
                )}
                <svg
                  className="w-8 h-8 text-indigo-400 mt-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
              </label>
            </div>

            {/* Display List of Selected Files (Horizontal + Wrap) */}
            {files.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Selected Files:</h3>
                <ul className="menu bg-base-200 rounded-box p-2 flex flex-wrap gap-2">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-700 whitespace-nowrap"
                    >
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Optional Submit Button */}
            <div className="mt-6 flex justify-end">
              <button className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
