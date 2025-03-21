import React, { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markdown";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import { useLocation, useParams } from 'react-router-dom';
import { projectService } from "../services/apis";
import { marked } from "marked";
import DOMPurify from "dompurify";

const Chunks = () => {
  const [userInput, setUserInput] = useState("");
  const [code, setCode] = useState("");
  const [documentation, setDocumentation] = useState("");
  const { projectId, fileId, chunkId } = useParams();
  const location = useLocation();
  const { chunk } = location.state || {};
  
  useEffect(() => {
    projectService.getFileChunkDoc(projectId, fileId, chunkId)
      .then(res => {
        setDocumentation(res);
        Prism.highlightAll();
      })
      .catch(e => {
        console.log(e);
      });

    projectService.getFileChunkCode(projectId, fileId, chunkId)
      .then(res => {
        setCode(res.chunk_content);
        Prism.highlightAll();
      })
      .catch(e => {
        console.log(e);
      });
  }, [projectId, fileId, chunkId]);

  const regenerateHandle = async () => {
    projectService.getFileChunkDocUpdate(projectId, fileId, chunk, userInput)
      .then(e => {
        alert("Document updated successfully");
      })
      .catch(e => {
        console.log(e);
        alert("Error in updation");
      });
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <div className="bg-base-100 text-gray-900 p-6">
      {/* File Info Section */}
      <div className="flex items-center bg-gray-200 p-3 rounded-lg shadow mt-4">
        <span className="text-lg font-semibold">File:</span>
        <span className="ml-2">{fileId}</span>
        <span className="ml-auto text-lg font-semibold">Chunk:</span>
        <span className="ml-2">{chunkId}</span>
      </div>

      {/* Code Section */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow-md border border-gray-300">
        <h2 className="text-lg font-semibold mb-2">Code</h2>
        <pre className="bg-gray-900 text-white p-3 rounded-md overflow-auto">
          <code className="language-jsx">{code}</code>
        </pre>
      </div>

      {/* Documentation & Input Section */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Existing Documentation */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
          <h2 className="text-lg font-semibold mb-2">Documentation</h2>
          <div
            className="text-gray-700 markdown-content"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(marked(documentation || "No documentation available."))
            }}
          />
        </div>

        {/* User Input Section */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
          <h2 className="text-lg font-semibold mb-2">Additional Input</h2>
          <textarea
            className="textarea w-full h-32 bg-white text-gray-900 border border-gray-400 p-2 rounded-md"
            placeholder="Enter additional details..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* Regenerate Button */}
      <div className="flex justify-center mt-6">
        <button className="btn btn-primary px-6" onClick={regenerateHandle}>🔄 Regenerate</button>
      </div>
    </div>
  );
};

export default Chunks;