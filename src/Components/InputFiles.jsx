import React, { useState } from "react";
import JSZip from "jszip";







export default function InputFiles() {

    const [folderHandle, setFolderHandle] = useState(null);

    const handleFolderSelect = async () => {
      try {
        const handle = await window.showDirectoryPicker();
        setFolderHandle(handle);
      } catch (error) {
        console.error("Error selecting folder:", error);
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

    //   const zipAndDownload = async () => {
    //     if (!folderHandle) {
    //       alert("Please select a folder first");
    //       return;
    //     }
    //     const zip = new JSZip();
    //     await readAndZipFolder(folderHandle, zip);
    //     const content = await zip.generateAsync({ type: "blob" });
    //     const url = URL.createObjectURL(content);
    //     const a = document.createElement("a");
    //     a.href = url;
    //     a.download = `${folderHandle.name}.zip`;

    //     console.log(a)
        // document.body.appendChild(a);
        // a.click();
        // document.body.removeChild(a);
    //   };



    const zipAndUpload = async () => {
        if (!folderHandle) {
          alert("Please select a folder first");
          return;
        }
        const zip = new JSZip();
        await readAndZipFolder(folderHandle, zip);
        const content = await zip.generateAsync({ type: "blob" });
        
        const formData = new FormData();
        formData.append("file", content, `${folderHandle.name}.zip`);
        console.log(content)
        try {
        //   const response = await fetch("/api/upload-zip", {
        //     method: "POST",
        //     body: formData,
        //   });
        //   if (response.ok) {
        //     alert("ZIP uploaded successfully");
        //   } else {
        //     alert("Failed to upload ZIP");
        //   }
        } catch (error) {
          console.error("Error uploading ZIP:", error);
          alert("Error uploading ZIP");
        }
      };
    

  return (
    <div>
      
        <div className="p-4">
        <button onClick={handleFolderSelect} className="px-4 py-2 bg-blue-500 text-black rounded">
  Select Project Folder
</button>
<button onClick={zipAndUpload} className="mt-4 px-4 py-2 bg-green-500 text-black rounded">
  Upload zip ZIP
</button>

      {folderHandle && <p className="mt-2">Selected: {folderHandle.name}</p>}
      
    </div>



    </div>
  )
}
