import { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [hairstyle, setHairstyle] = useState("");
  const [recommendations, setRecommendations] = useState(null);
  const [faceShape, setFaceShape] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleImageUpload = async () => {
    if (image && hairstyle) {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append("image", image);
      formData.append("hair_length", hairstyle);

      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/upload_image/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFaceShape(response.data.face_shape);
        setRecommendations(response.data.recommended_styles);
      } catch (error) {
        console.error("Error uploading image:", error);
        setError(
          error.response?.data?.error ||
            "An error occurred while uploading the image."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 m-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Upload Image
        </h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <label className="block mb-4">
          Select Hairstyle:
          <select
            value={hairstyle}
            onChange={(e) => setHairstyle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          >
            <option value="">Select</option>
            <option value="long">Long</option>
            <option value="short">Short</option>
            <option value="updo">Updo</option>
          </select>
        </label>
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-60 object-contain rounded-md"
            />
          </div>
        )}
        <button
          onClick={handleImageUpload}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
        {faceShape && recommendations && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">
              Face Shape: {faceShape}
            </h3>
            <h4 className="text-lg font-semibold mb-2">
              Recommended Hairstyles:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recommendations.map((style, index) => (
                <img
                  key={index}
                  src={style}
                  alt={`Recommended style ${index + 1}`}
                  className="w-full h-auto rounded-md"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
