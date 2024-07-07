// ./src/components/ImageUpload.js
import { useState } from "react";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = () => {
    if (image) {
      console.log("Uploading:", image);
      // Handle image upload logic here
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Upload Image
        </h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-60 object-cover rounded-md"
            />
          </div>
        )}
        <button
          onClick={handleImageUpload}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
