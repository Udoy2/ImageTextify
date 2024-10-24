// DragDropFileUpload.js
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ClipLoader } from 'react-spinners';

const DragDropFileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
  });

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('File uploaded successfully!');
    }, 2000); // Simulate a file upload delay
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div
        {...getRootProps()}
        className={`w-80 p-6 rounded-lg shadow-lg border-dashed border-2 ${
          isDragActive ? 'border-blue-500' : 'border-gray-600'
        } bg-gray-800 flex flex-col items-center justify-center`}
      >
        <input {...getInputProps()} />
        <div className="text-white">
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <p>Drag n drop some files here, or click to select files</p>
          )}
        </div>
        {file && (
          <div className="mt-4">
            <img
              src={file.preview}
              alt="Preview"
              className="w-16 h-16 object-cover rounded-md"
              onLoad={() => {
                URL.revokeObjectURL(file.preview); // Clean up after previewing
              }}
            />
          </div>
        )}
      </div>
      {file && (
        <button
          onClick={handleSubmit}
          className="ml-2 mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          {loading ? <ClipLoader color="#fff" size={20} /> : 'Submit'}
        </button>
      )}
    </div>
  );
};

export default DragDropFileUpload;
