// ✅ Full updated Properties.jsx with Bookmark Feature and Restored Grid/List View and Filters
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from 'react-router-dom';

import {
  MapPin,
  IndianRupee,
  BedDouble,
  Bath,
  Ruler,
  Grid,
  List,
  SlidersHorizontal,
  X,
  Search,
  Bookmark,
  BookmarkCheck
} from "lucide-react";
import ContactSeller from "./ContactSeller";
import { FaBed, FaBath, FaPhone } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { IoHome } from 'react-icons/io5';




const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = images.length;

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="overflow-hidden rounded-md h-60 w-full">
        {images[currentIndex]}
      </div>
      <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2">&#8592;</button>
      <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2">&#8594;</button>
      <div className="text-center mt-2 text-sm text-gray-600">
        {currentIndex + 1} / {total}
      </div>
    </div>
  );
};

const PropertyDetailsModal = ({ property, onClose }) => {
  const [showContactForm, setShowContactForm] = useState(false);
  const navigate = useNavigate();


  if (!property) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-5xl w-full p-6 relative overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 p-1 hover:bg-gray-200 rounded">
          <X size={20} />
        </button>

        {property.images && property.images.length > 0 && (
          <ImageCarousel
            images={property.images.map((img, i) => (
              <img key={i} src={`http://localhost:5000${img}`} alt={`Property Image ${i + 1}`} className="rounded-md object-cover w-full h-60" />
            ))}
          />
        )}

        <h2 className="text-3xl font-bold mb-1">{property.title}</h2>
        <div className="flex items-center text-gray-600 mb-6">
          <MdLocationOn className="mr-1" /> {property.location}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-2xl text-blue-700 font-bold mb-2">₹{property.price}</h3>
            <p className="text-gray-600 mb-4">Available for buy</p>
            <div className="flex gap-6 mb-4 text-gray-800">
              <div className="flex items-center gap-1 bg-blue-50 p-2 border rounded-lg w-64"><FaBed /> {property.beds} Beds</div>
              <div className="flex items-center gap-1 bg-blue-50 p-2 border rounded-lg w-64"><FaBath /> {property.baths} Baths</div>
              <div className="flex items-center gap-1 bg-blue-50 p-2 border rounded-lg w-64"><IoHome /> {property.sqft} sqft</div>
            </div>
            <div className="text-gray-700 flex items-center gap-2 mb-4"><FaPhone /> +91-9123456780</div>
              <button className="w-full border rounded-md bg-blue-600 text-white p-2 text-lg mt-4"
      onClick={() => navigate('/contact-seller',{ state: { property } })}
    >
      Contact Seller
    </button>
            {/* <button className="w-full border rounded-md bg-blue-600 text-white p-2 text-lg mt-4" onClick={() => setShowContactForm(true)}>Contact Seller</button> */}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700 mb-4">{property.description}</p>
            <h3 className="text-xl font-semibold mb-2">Amenities</h3>
            <ul className="list-disc list-inside text-gray-700 grid grid-cols-2 gap-1">
              {(property.amenities || []).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Properties = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [filterBedrooms, setFilterBedrooms] = useState("");
  const [filterBathrooms, setFilterBathrooms] = useState("");
  const [filterPriceMin, setFilterPriceMin] = useState("");
  const [filterPriceMax, setFilterPriceMax] = useState("");
  const [properties, setProperties] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProperties();
    fetchBookmarks();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/property/getAll");
      setProperties(res.data);
    } catch (e) {
      console.error("Failed to load properties.");
    }
  };

  

// Update fetchBookmarks to set bookmarkedIds state
const fetchBookmarks = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      'http://localhost:5000/api/property/find/bookmarked-properties',
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // Assuming response.data is an array of bookmarked property objects
    const bookmarkedIdsFromServer = response.data.map((property) => property._id);
    setBookmarkedIds(bookmarkedIdsFromServer);
  } catch (error) {
    console.error(error);
  }
};

// Update toggleBookmark to optimistically update bookmarkedIds
const toggleBookmark = async (propertyId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const response = await axios.put(
      `http://localhost:5000/api/property/bookmark/${propertyId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    // Optimistic UI update: toggle the property id in bookmarkedIds
    setBookmarkedIds((prevIds) => {
      if (prevIds.includes(propertyId)) {
        return prevIds.filter((id) => id !== propertyId);
      } else {
        return [...prevIds, propertyId];
      }
    });
  } catch (error) {
    console.error("Failed to toggle bookmark.", error);
  }
};



  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        if (
          searchQuery &&
          ![p.title, p.location, p.description].some((field) =>
            field?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        ) return false;
        if (filterType && p.type?.toLowerCase() !== filterType.toLowerCase()) return false;
        if (filterBedrooms && p.beds < Number(filterBedrooms)) return false;
        if (filterBathrooms && p.baths < Number(filterBathrooms)) return false;
        if (filterPriceMin && p.price < Number(filterPriceMin)) return false;
        if (filterPriceMax && p.price > Number(filterPriceMax)) return false;
        return true;
      });
  }, [properties, searchQuery, filterType, filterBedrooms, filterBathrooms, filterPriceMin, filterPriceMax]);

  return (
    <div className="mt-24 min-h-screen bg-gray-50 p-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Property</h1>
        <div className="relative w-full max-w-md">
          <input
            type="search"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowFilters((show) => !show)}
            className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-blue-50"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>
          <button
            onClick={() => setIsGridView((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-blue-50"
          >
            {isGridView ? <><List className="w-5 h-5" /> List View</> : <><Grid className="w-5 h-5" /> Grid View</>}
          </button>
        </div>
      </header>

      {showFilters && (
        <section className="mb-6 bg-white p-6 rounded-lg shadow max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Filter Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium">Property Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="">Any</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Bedrooms (Min)</label>
              <input type="number" min="0" value={filterBedrooms} onChange={(e) => setFilterBedrooms(e.target.value)} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Bathrooms (Min)</label>
              <input type="number" min="0" value={filterBathrooms} onChange={(e) => setFilterBathrooms(e.target.value)} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Min Price</label>
              <input type="number" min="0" value={filterPriceMin} onChange={(e) => setFilterPriceMin(e.target.value)} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Max Price</label>
              <input type="number" min="0" value={filterPriceMax} onChange={(e) => setFilterPriceMax(e.target.value)} className="w-full border rounded p-2" />
            </div>
          </div>
        </section>
      )}

      <main className={`max-w-6xl mx-auto ${isGridView ? 'grid grid-cols-1 sm:grid-cols-2 gap-6' : 'space-y-6'}`}>
        {filteredProperties.map((property) => (
          <div key={property._id} className="bg-white rounded-lg shadow p-4 relative">
            <div className="absolute top-4 right-4 z-10">
              <button onClick={(e) => { e.stopPropagation(); toggleBookmark(property._id); }}>
                {bookmarkedIds.includes(property._id) ? (
                  <BookmarkCheck className="text-yellow-500" />
                ) : (
                  <Bookmark className="text-gray-400" />
                )}
              </button>
            </div>
            <div onClick={() => setSelectedProperty(property)} className="cursor-pointer">
              <img
                src={property.images?.[0] ? `http://localhost:5000${property.images[0]}` : "/default-property.jpg"}
                alt={property.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-1">{property.title}</h3>
              <div className="text-sm text-gray-500 mb-2 flex items-center">
                <MapPin size={16} className="mr-1" /> {property.location}
              </div>
              <div className="text-blue-600 font-bold text-xl mb-2">
                ₹{Number(property.price).toLocaleString("en-IN")}
              </div>
              <div className="flex space-x-6 text-gray-700 text-sm font-medium">
      <div className="flex items-center justify-center  gap-1 bg-blue-50 p-2 border rounded-lg w-64">
        <BedDouble size={18} />
        <span>{property.beds} Beds</span>
      </div>
      <div className="flex items-center justify-center  gap-1 bg-blue-50 p-2 border rounded-lg w-64">
        <Bath size={18} />
        <span>{property.baths} Baths</span>
      </div>
      <div className="flex items-center justify-center  gap-1 bg-blue-50 p-2 border rounded-lg w-64">
        <Ruler size={18} />
        <span>{property.sqft} sqft</span>
      </div>
    </div>
            </div>
          </div>
        ))}
      </main>

      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
};

export default Properties;
