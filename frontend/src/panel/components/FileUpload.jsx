import React, { useRef } from "react";
import { Upload, FileText, X } from "lucide-react";

export default function FileUpload({ files, setFiles, uploading, accept = ".txt,.doc,.docx,.pdf" }) {
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    const supported = selected.filter(f => accept.split(',').some(ext => f.name.endsWith(ext.trim())));
    setFiles(prev => [...prev, ...supported]);
    e.target.value = null;
  };

  const handleRemoveFile = (idx) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (uploading) return;
    const dropped = Array.from(e.dataTransfer.files);
    const supported = dropped.filter(f => accept.split(',').some(ext => f.name.endsWith(ext.trim())));
    setFiles(prev => [...prev, ...supported]);
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer bg-gray-50"
      onClick={() => !uploading && inputRef.current && inputRef.current.click()}
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
      tabIndex={0}
      role="button"
      aria-label="Upload files"
    >
      <input
        type="file"
        accept={accept}
        className="hidden"
        ref={inputRef}
        multiple
        onChange={handleFileChange}
        disabled={uploading}
      />
      <Upload className="w-10 h-10 text-gray-400 mb-2" />
      <span className="text-gray-600">Drag and drop files here, or click to select</span>
      <span className="text-xs text-gray-400 mt-1">Supported: {accept}</span>
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 w-full justify-center">
          {files.map((file, idx) => (
            <div key={(file.path || file.name) + idx} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
              <FileText className="w-4 h-4 mr-1" />
              <span>{file.name}</span>
              <button
                type="button"
                className="ml-2 text-blue-600 hover:text-red-500"
                onClick={e => { e.stopPropagation(); handleRemoveFile(idx); }}
                disabled={uploading}
                aria-label={`Remove ${file.name}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


