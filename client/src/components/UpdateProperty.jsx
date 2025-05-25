import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const UpdateProperty = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchProperty = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/properties/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProperty(res.data);
    } catch (err) {
      console.error("Failed to fetch property:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchProperty();
}, [propertyId]);


 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    await axios.put(`http://localhost:5000/api/properties/${propertyId}`, property, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert("Property updated successfully");
    navigate("/dashboard");
  } catch (err) {
    console.error(err);
    alert("Failed to update property");
  }
};


  if (!property) return <p>Loading property details...</p>;


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={property.title}
        onChange={(e) => setProperty({ ...property, title: e.target.value })}
      />
      {/* aur bhi fields */}
      <button type="submit">Update Property</button>
    </form>
  );
};

export default UpdateProperty;
