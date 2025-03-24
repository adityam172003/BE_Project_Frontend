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
        <div className="h-full bg-white text-gray-800 p-4 w-64 flex-shrink-0 border-r border-gray-300 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">📂 File Explorer</h2>
            <ul>
                {files?.map((file, index) => (
                    <li
                        key={index}
                        className="cursor-pointer p-2 hover:bg-gray-100 rounded border-b border-gray-200 transition-colors"
                        onClick={() => onSelect(file)}
                        draggable
                        onDragStart={(e) =>
                            e.dataTransfer.setData("text/plain", file.filename)
                        }
                    >
                        {file.filename}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const FileViewer = ({
    projectId,
    selectedFile,
    isViewingCode,
    toggleView,
    openChunkModal,
}) => {
    const [file, setFile] = useState(selectedFile);

    useEffect(() => {
        if (selectedFile && projectId) {
            projectService
                .getProjectFileDoc(projectId, selectedFile.id)
                .then((res) => {
                    setFile((prevFile) => ({ ...prevFile, readme: res }));
                    Prism.highlightAll();
                })
                .catch((e) => {
                    console.log(e);
                });

            projectService
                .getProjectFileCode(projectId, selectedFile.id)
                .then((res) => {
                    setFile((prevFile) => ({
                        ...prevFile,
                        content: res.file_content,
                    }));
                    Prism.highlightAll();
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [selectedFile, projectId, isViewingCode]);

    return (
        <div className="flex flex-col h-full px-4 w-full overflow-x-auto">
            {/* Header Section */}
            <div className="bg-white p-3 shadow-md sticky top-0 border-b border-gray-300">
                <h2 className="text-lg font-semibold text-blue-600">
                    📄 {file ? selectedFile.filename : "Select a file"}
                </h2>
            </div>

            {/* Content Section */}
            <div className="flex-grow bg-gray-100 p-4 pt-1 overflow-auto border border-gray-300 max-w-full h-200px rounded-b-lg ">
                <pre className="p-4 rounded-md overflow-auto border border-gray-300 text-gray-800 line-numbers">
                    <code
                        className={
                            isViewingCode ? "language-jsx" : "language-markdown"
                        }
                        dangerouslySetInnerHTML={{
                            __html: file
                                ? isViewingCode
                                    ? Prism.highlight(
                                          file.content,
                                          Prism.languages.jsx,
                                          "jsx"
                                      )
                                    : DOMPurify.sanitize(
                                          marked(
                                              file.readme ||
                                                  "# No ReadMe Available"
                                          )
                                      )
                                : Prism.highlight(
                                      "# Select a file from the explorer",
                                      Prism.languages.markdown,
                                      "markdown"
                                  ),
                        }}
                    />
                </pre>
            </div>

            {/* Footer Section */}
            {file && (
                <div className="w-full bg-white p-4 flex justify-between border-t border-gray-300 sticky bottom-0">
                    <button className="btn bg-blue-500 text-white hover:bg-blue-600">
                        Update
                    </button>

                    <button
                        className="btn btn-secondary"
                        onClick={openChunkModal}
                    >
                        View Chunks
                    </button>

                    <button
                        className="btn bg-green-500 text-white hover:bg-green-600"
                        onClick={toggleView}
                    >
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
                const response = await projectService.getProjectFiles(
                    projectId
                );
                setFiles(response);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };
        fetchFiles();
    }, [projectId]);

    const openChunkModal = async () => {
        try {
            const response = await projectService.getFileChunks(
                projectId,
                selectedFile.id
            );
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
        navigate(`/chunks/${projectId}/${selectedFile.id}/${chunk.id}`, {
            state: { chunk },
        });
    };

    return (
        <div className={`flex h-screen ${isModalOpen ? "blur-sm" : ""}`}>
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
                className="bg-white p-8 rounded-xl w-full md:w-1/3 shadow-2xl mx-auto mt-20 overflow-auto max-h-[80vh] z-50 mb-30"
                overlayClassName="fixed inset-0 backdrop-blur-sm bg-opacity-0 flex justify-center items-center"
            >
                {/* Header */}
                <h3 className="text-xl font-semibold mb-6 text-gray-900">
                    📦 File Chunks ({selectedFile?.filename})
                </h3>

                {/* Chunk List */}
                {chunkFiles?.length > 0 ? (
                    <ul className="space-y-2 max-h-60 overflow-y-auto text-gray-800">
                        {chunkFiles.map((chunk, index) => (
                            <li
                            key={index}
                            className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition flex justify-between"
                            onClick={() => handleChunkClick(chunk)}
                        >
                            <div>
                                <span className="font-medium">Chunk {index + 1} :</span>{" "}
                                {chunk.chunk_type}
                            </div>
                            <span>{chunk.start_line}-{chunk.end_line}</span>
                        </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 italic">
                        No chunk files available.
                    </p>
                )}

                {/* Footer */}
                <button
                    className="btn btn-error mt-6 w-full text-base-200 text-base hover:bg-red-600 transition"
                    onClick={closeChunkModal}
                >
                    Close
                </button>
            </Modal>
        </div>
    );
};

export default ViewDoc;
