import React, { useState, useRef, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markdown";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import { projectService } from "../services/apis";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";


import { marked } from "marked";
import DOMPurify from "dompurify";


Modal.setAppElement("#root");

const FileExplorer = ({ files, onSelect }) => {
  return (
    <div className="h-full bg-gray-900 text-white p-4 overflow-auto w-64 border-r border-gray-700">
      <h2 className="text-lg font-semibold mb-4">📂 File Explorer</h2>
      <ul>
        {files?.map((file, index) => (
          <li
            key={index}
            className="cursor-pointer p-2 hover:bg-gray-700 rounded border-b border-gray-600"
            onClick={() => onSelect(file)}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", file.filename)}
          >
            {file.filename}
          </li>
        ))}
      </ul>
    </div>
  );
};

const FileViewer = ({ projectId, selectedFile, isViewingCode, toggleView, openChunkModal }) => {
  const [file, setFile] = useState(selectedFile);

  useEffect(() => {
    if (selectedFile && projectId) {
      projectService.getProjectFileDoc(projectId, selectedFile.id)
        .then(res => {
          setFile(prevFile => ({ ...prevFile, readme: res }));
          Prism.highlightAll();
        })
        .catch(e => {
          console.log(e);
        });

      projectService.getProjectFileCode(projectId, selectedFile.id)
        .then(res => {
          setFile(prevFile => ({ ...prevFile, content: res.file_content }));
          Prism.highlightAll();
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [selectedFile, projectId, isViewingCode]);

  return (
    <div className="flex flex-col h-full p-4 w-full overflow-x-auto">
      <div className="bg-gray-900 p-3 rounded-lg shadow-md sticky top-0 z-10">
        <h2 className="text-lg font-semibold text-blue-400">
          📄 {file ? selectedFile.filename : "Select a file"}
        </h2>
      </div>
      <div className="flex-grow bg-gray-800 p-4 rounded-lg overflow-auto border border-gray-700 max-w-full">
        <pre className="p-4 rounded-md overflow-auto border border-gray-600 text-white line-numbers">
          <code
            className={isViewingCode ? "language-jsx" : "language-markdown"}
            dangerouslySetInnerHTML={{
              __html: file
                ? isViewingCode
                  ? Prism.highlight(file.content, Prism.languages.jsx, "jsx")
                  : DOMPurify.sanitize(marked(file.readme || "# No ReadMe Available"))
                : Prism.highlight("# Select a file from the explorer", Prism.languages.markdown, "markdown"),
            }}
          />
        </pre>
      </div>
      {file && (
        <div className="w-full bg-gray-900 p-4 flex justify-between border-t border-gray-700 sticky bottom-0 z-10">
          <button className="btn btn-primary">Update</button>
          <button className="btn btn-secondary" onClick={openChunkModal}>Chunks</button>
          <button className="btn btn-accent" onClick={toggleView}>
            {isViewingCode ? "View ReadMe" : "View Code"}
          </button>
        </div>
      )}
    </div>
  );
};

const ViewDoc = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isViewingCode, setIsViewingCode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chunkFiles, setChunkFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await projectService.getProjectFiles(projectId);
        setFiles(response);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    fetchFiles();
  }, [projectId]);

  const openChunkModal = async () => {
    try {
      const response = await projectService.getFileChunks(projectId, selectedFile.id);
      console.log(response);
      setChunkFiles(response);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching chunks:", error);
    }
  };

  const closeChunkModal = () => {
    setIsModalOpen(false);
  };

  const handleChunkClick = (chunk) => {

    navigate(`/chunks/${projectId}/${selectedFile.id}/${chunk.id}`, { state: { chunk } });
  };

  return (
    <div className="flex h-screen">
      <FileExplorer
        files={files}
        onSelect={(file) => {
          console.log(file.id);
          setSelectedFile(file);
          setIsViewingCode(false);
        }}
      />
      <div className="flex-grow overflow-auto">
        <FileViewer
          projectId={projectId}
          selectedFile={selectedFile}
          isViewingCode={isViewingCode}
          toggleView={() => setIsViewingCode(!isViewingCode)}
          openChunkModal={openChunkModal}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeChunkModal}
        className="bg-white p-6 rounded-lg w-full md:w-1/3 shadow-lg mx-auto mt-20 overflow-auto max-h-full"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h3 className="text-lg font-bold mb-4">Chunk Files</h3>
        <ul className="list-disc pl-5">
          {chunkFiles?.map((chunk, index) => (
            <li
              key={index}
              className="p-2 border-b border-gray-300 text-gray-800 cursor-pointer"
              onClick={() => handleChunkClick(chunk)}
            >
              {chunk.id}
            </li>
          ))}
        </ul>
        <button className="btn btn-error mt-4 w-full" onClick={closeChunkModal}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default ViewDoc;