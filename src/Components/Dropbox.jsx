import InputFiles from "./InputFiles";
import Navbar from "./Navbar";
import React, { useState } from "react";
import JSZip from "jszip";
import { projectService } from "../services/apis";

export default function Dropbox() {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");



  const [folderHandle, setFolderHandle] = useState(null);

  const handleFolderSelect = async () => {
    try {
      console.log("Folder select clicked");
      const handle = await window.showDirectoryPicker();
      console.log("Selected folder handle:", handle);
      setFolderHandle(handle);
    } catch (error) {
      console.error("Error selecting folder:", error);
      alert(
        "Error selecting folder. Ensure you're using Chrome and running on a secure context."
      );
    }
  };


  
  const readAndZipFolder = async (folderHandle, zip) => {
    for await (const entry of folderHandle.values()) {
      if (entry.kind === "file") {
        const file = await entry.getFile();
        const content = await file.arrayBuffer();
        zip.file(entry.name, content);
      } else if (entry.kind === "directory") {
        const subZip = zip.folder(entry.name);
        await readAndZipFolder(entry, subZip);
      }
    }
  };


  const zipAndUpload = async () => {
    console.log("clicked")
    if (!folderHandle) {
      alert("Please select a folder first");
      return;
    }
    const zip = new JSZip();
    await readAndZipFolder(folderHandle, zip);
    const content = await zip.generateAsync({ type: "blob" });

    const formData = new FormData();
    formData.append("zip_file", content);
    formData.append("title", title);
    formData.append("description", description);



    //console.log(content)
    console.log(formData , "in upload")

   

    try {

      await projectService.createProject(formData);
      alert("ZIP uploaded successfully");

    } catch (error) {
      console.error("Error uploading ZIP:", error);
      alert("Error uploading ZIP");
    }
  };


  const handleFileChange = (e) => {
    // Convert the FileList into an Array
    setFiles((prevFiles) => [...prevFiles, ...Array.from(e.target.files)]);

  };

  return (
    <div>
      <div className="flex justify-center items-center mt-15">
        <div className="card w-full sm:w-3/4 lg:w-1/2 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-1 ml-1">Create New Project</h2>
            <p className="text-xs text-gray-500 mb-2 ml-1">
              Files should be of format .py, .java or .cpp
            </p>

            {/* Title Input */}
            <div className="form-control mb-3">
              <label className="ml-1 mb-1">
                <span className="text-lg font-semibold">Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter project title"
                className="input input-bordered w-full rounded-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Description TextArea with Smooth Border */}
            <div className="form-control mb-3">
              <label className="ml-1 mb-1">
                <span className="text-lg font-semibold">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full rounded-lg"
                placeholder="Enter description of project"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* File Upload Area */}
            {/* <div className="mt-4 w-full flex justify-center">
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
            </div> */}

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
           <div>

<div className="p-4 ">
  <div className="flex justify-around">
  <button onClick={handleFolderSelect} className="w-full px-4 py-2 mr-2 bg-blue-500 text-black rounded cursor-pointer">
    Select Project Folder
  </button>

  <button onClick={zipAndUpload} className={folderHandle ? "w-full px-4 py-2 ml-2 bg-green-500 text-black rounded cursor-pointer" : "w-full px-4 py-2 ml-2 bg-red-300 text-black rounded cursor-not-allowed"} disabled={!folderHandle}>
    Upload zip ZIP
  </button>
  </div>
  

  {folderHandle && <p className="mt-2">Selected: {folderHandle.name}</p>}

</div>



</div>
            {/* Optional Submit Button */}
            {/* <div className="mt-6 flex justify-end">
              <button className="btn btn-primary">Submit</button>
            </div> */}
          </div>
        </div>
      </div>



      
    </div>
  );
}
