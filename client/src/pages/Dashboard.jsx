import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { currentUser, token } = useSelector((state) => state.auth);
  const [listedProperties, setListedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(currentUser?.profileImage || "");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/property/find/my-properties",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched properties:", res.data);  // <-- check here

        setListedProperties(res.data);
      } catch (error) {
        console.error("Failed to fetch listed properties:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchMyProperties();
    } else {
      setLoading(false);
    }
  }, [token]);

const handleProfilePicUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const filename = Date.now() + file.name;
  const formData = new FormData();
  formData.append("filename", filename); // used in your backend filename
  formData.append("image", file); // matches your multer field name

  try {
    const res = await axios.post(
      "http://localhost:5000/api/user/image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setProfileImage(`images/${filename}`); // relative path used for displaying
  } catch (error) {
    console.error("Profile picture upload failed:", error);
  }
};


  const handleDelete = async (propertyId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this property?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/property/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setListedProperties((prev) =>
        prev.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      console.error("Failed to delete property:", error);
      alert("Failed to delete property");
    }
  };

  const handleEdit = (propertyId) => {
    console.log("Navigating to edit property:", propertyId);

    navigate(`/edit-property/${propertyId}`);
  };

 
const getProfileImageUrl = () => {
  if (profileImage) {
    return profileImage.startsWith("http")
      ? profileImage
      : `http://localhost:5000/${profileImage}`;
  }
  return "/default-avatar.png";
};


  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto">
      <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-x-6 md:space-y-0 mb-10 text-center md:text-left">
        {/* <img
        
          src={getProfileImageUrl()}
          className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
        /> */}

        <div>
          <h2 className="text-2xl font-semibold"> Name : {currentUser?.name || "Full Name"}</h2>
          <p className="text-gray-600">Email : {currentUser?.email || "Email address"}</p>
          <div className="mt-4">
            {/* <label className="block font-medium text-sm mb-1">Update Profile Picture</label> */}
            {/* <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicUpload}
              className="border px-3 py-2 rounded-md w-full max-w-xs"
            /> */}
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4 text-center">My Listed Properties</h3>
      {loading ? (
        <p className="text-gray-500 text-center">Loading properties...</p>
      ) : listedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listedProperties.map((property) => (
            <div key={property._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={
                  property.images && property.images.length > 0
                    ? `http://localhost:5000${property.images[0]}`
                    : "/default-property.jpg"
                }
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-2">{property.title}</h4>
                <p className="text-green-600 font-medium mb-4">₹{property.price}</p>

                <div className="flex justify-between">
                  <button
                    onClick={() => handleEdit(property._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">You haven't listed any properties yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
