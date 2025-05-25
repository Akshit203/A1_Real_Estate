import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListProperty = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    image: [],
    beds: "",
    baths: "",
    sqft: "",
    type: "",
    availability: "",
    description: "",
    amenities: "",
    phone: "",
    featured: false,
  });

  const [previewImages, setPreviewImages] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, image: files });
      const previews = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewImages(previews);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple phone validation (10 digits)
    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("location", formData.location);
    formPayload.append("price", Number(formData.price));
    formPayload.append("beds", Number(formData.beds));
    formPayload.append("baths", Number(formData.baths));
    formPayload.append("sqft", Number(formData.sqft));
    formPayload.append("type", formData.type);
    formPayload.append("availability", formData.availability);
    formPayload.append("description", formData.description);
    formPayload.append("phone", formData.phone);
    formPayload.append("featured", formData.featured);

    formData.amenities
      .split(",")
      .map((a) => a.trim())
      .forEach((a) => formPayload.append("amenities[]", a));

    Array.from(formData.image).forEach((file) => formPayload.append("image", file));

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/property",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Property listed successfully!");

      // Reset form and previews
      setFormData({
        title: "",
        location: "",
        price: "",
        image: [],
        beds: "",
        baths: "",
        sqft: "",
        type: "",
        availability: "",
        description: "",
        amenities: "",
        phone: "",
        featured: false,
      });
      setPreviewImages([]);

      navigate("/properties");
    } catch (error) {
      console.error("Error listing property:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-24 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">List Your Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title & Location */}
        <div className="flex gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-1/2 border p-2 rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-1/2 border p-2 rounded"
          />
        </div>

        {/* Price, Beds, Baths */}
        <div className="flex gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-1/3 border p-2 rounded"
          />
          <input
            type="number"
            name="beds"
            placeholder="Beds"
            value={formData.beds}
            onChange={handleChange}
            required
            className="w-1/3 border p-2 rounded"
          />
          <input
            type="number"
            name="baths"
            placeholder="Baths"
            value={formData.baths}
            onChange={handleChange}
            required
            className="w-1/3 border p-2 rounded"
          />
        </div>

        {/* Sqft, Type, Availability */}
        <div className="flex gap-4">
          <input
            type="number"
            name="sqft"
            placeholder="Square Feet"
            value={formData.sqft}
            onChange={handleChange}
            required
            className="w-1/3 border p-2 rounded"
          />
          <input
            type="text"
            name="type"
            placeholder="Type (e.g. Apartment)"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-1/3 border p-2 rounded"
          />
          <input
            type="text"
            name="availability"
            placeholder="Availability (e.g. Immediate)"
            value={formData.availability}
            onChange={handleChange}
            required
            className="w-1/3 border p-2 rounded"
          />
        </div>

        {/* Image Upload */}
        <input
          type="file"
          name="image"
          accept="image/*"
          multiple
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />

        {/* Preview */}
        {previewImages.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {previewImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Preview"
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        )}

        {/* Description */}
        <textarea
          name="description"
          placeholder="Property Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded h-24"
        />

        {/* Amenities */}
        <input
          type="text"
          name="amenities"
          placeholder="Amenities (comma separated)"
          value={formData.amenities}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {/* Phone Number */}
        <input
          type="text"
          name="phone"
          placeholder="Contact Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {/* Featured */}
        {/* <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          <span>Mark as Featured</span>
        </label> */}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Property
        </button>
      </form>
    </div>
  );
};

export default ListProperty;
