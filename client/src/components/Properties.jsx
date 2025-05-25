import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import {
  MapPin,
  IndianRupee,
  BedDouble,
  Bath,
  Ruler,
  Phone,
  Grid,
  List,
  SlidersHorizontal,
  X,
  Search,
} from "lucide-react";

import ContactSeller from "./ContactSeller"; // Adjust the import path accordingly

// const PropertyDetailsModal = ({ property, onClose }) => {
//   const [showContactForm, setShowContactForm] = useState(false);

//   if (!property) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-lg max-w-3xl w-full p-6 relative"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 p-1 hover:bg-gray-200 rounded"
//         >
//           <X size={20} />
//         </button>

//         {!showContactForm ? (
//           <>
//             <h2 className="text-2xl font-bold mb-2">{property.title}</h2>
//             <p className="mb-4">{property.description}</p>
//             <button
//               onClick={() => setShowContactForm(true)}
//               className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//             >
//               Contact Seller
//             </button>

//             <div className="flex flex-wrap gap-4 mb-4">
//               {/* Your existing details here */}
//               <div className="flex items-center gap-1">
//                 <MapPin /> <span>{property.location}</span>
//               </div>
//               {/* other property info */}
//             </div>

//             {/* Images if any */}
//             {property.images && property.images.length > 0 && (
//               <div className="grid grid-cols-2 gap-3">
//                 {property.images.map((img, i) => (
//                   <img
//                     key={i}
//                     src={`http://localhost:5000${img}`}
//                     alt={`Property Image ${i + 1}`}
//                     className="rounded-md object-cover w-full h-48"
//                   />
//                 ))}
//               </div>
//             )}
//           </>
//         ) : (
//           <ContactSeller
//             property={property}
//             onClose={() => setShowContactForm(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

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
      {/* Show only the current image */}
      <div className="overflow-hidden rounded-md h-60 w-full">
        {images[currentIndex]}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2"
        aria-label="Previous Image"
      >
        &#8592;
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2"
        aria-label="Next Image"
      >
        &#8594;
      </button>

      {/* Image counter */}
      <div className="text-center mt-2 text-sm text-gray-600">
        {currentIndex + 1} / {total}
      </div>
    </div>
  );
};



const PropertyDetailsModal = ({ property, onClose }) => {
  const [showContactForm, setShowContactForm] = useState(false);

  if (!property) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-5xl w-full p-6 relative overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 hover:bg-gray-200 rounded"
        >
          <X size={20} />
        </button>

        {/* Image Gallery */}
        {/* {property.images && property.images.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {property.images.map((img, i) => (
              <img
                key={i}
                src={`http://localhost:5000${img}`}
                alt={`Property Image ${i + 1}`}
                className="rounded-md object-cover w-full h-60"
              />
            ))}
          </div>
        )} */}
{property.images && property.images.length > 0 && (
  <ImageCarousel
    images={property.images.map((img, i) => (
      <img
        key={i}
        src={`http://localhost:5000${img}`}
        alt={`Property Image ${i + 1}`}
        className="rounded-md object-cover w-full h-60"
      />
    ))}
  />
)}



        {/* Title & Location */}
        <h2 className="text-3xl font-bold mb-1">{property.title}</h2>
        <div className="flex items-center text-gray-600 mb-6">
          <MdLocationOn className="mr-1" /> {property.location}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <h3 className="text-2xl text-blue-700 font-bold mb-2">
              ₹{property.price || '2,50,000'}
            </h3>
            <p className="text-gray-600 mb-4">Available for buy</p>

            <div className="flex gap-6 mb-4 text-gray-800">
      <div className="flex items-center justify-center  gap-1 bg-blue-50 p-2 border rounded-lg w-64">
                <FaBed /> {property.beds || 4} Beds
              </div>
      <div className="flex items-center justify-center  gap-1 bg-blue-50 p-2 border rounded-lg w-64">
                <FaBath /> {property.baths || 4} Baths
              </div>
      <div className="flex items-center justify-center  gap-1 bg-blue-50 p-2 border rounded-lg w-64">

                <IoHome /> {property.area || '4500 sqft'}
              </div>
            </div>

            <div className="text-gray-700 flex items-center gap-2 mb-4">
              <FaPhone /> +91-9123456780
            </div>

            <button className="w-full border rounded-md bg-blue-600 text-white p-2 text-lg mt-4" onClick={() => setShowContactForm(true)}>
              Contact Seller
            </button>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700 mb-4">{property.description}</p>

            <h3 className="text-xl font-semibold mb-2">Amenities</h3>
            <ul className="list-disc list-inside text-gray-700 grid grid-cols-2 gap-1">
              {(property.amenities || [
                'Beach Access',
                'Private Pool',
                'Garden',
                'Jacuzzi',
                'Home Theatre',
              ]).map((item, index) => (
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
  // UI state
  const [isGridView, setIsGridView] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Data & selection
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Filters & search state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterBedrooms, setFilterBedrooms] = useState("");
  const [filterBathrooms, setFilterBathrooms] = useState("");
  const [filterPriceMin, setFilterPriceMin] = useState("");
  const [filterPriceMax, setFilterPriceMax] = useState("");

  // Fetch properties once on mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          
          "http://localhost:5000/api/property/getAll"
        );
        setProperties(res.data);
        setError(null);
      } catch (e) {
        setError("Failed to load properties.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Filtered & searched properties memoized
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        // Search filter (title, location, description)
        if (
          searchQuery &&
          ![p.title, p.location, p.description]
            .some((field) =>
              field?.toLowerCase().includes(searchQuery.toLowerCase())
            )
        ) {
          return false;
        }
        // Property type filter
        if (filterType && p.type?.toLowerCase() !== filterType.toLowerCase()) {
          return false;
        }
        // Bedrooms filter
        if (filterBedrooms && p.beds < Number(filterBedrooms)) {
          return false;
        }
        // Bathrooms filter
        if (filterBathrooms && p.baths < Number(filterBathrooms)) {
          return false;
        }
        // Price min filter
        if (filterPriceMin && p.price < Number(filterPriceMin)) {
          return false;
        }
        // Price max filter
        if (filterPriceMax && p.price > Number(filterPriceMax)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => a.price - b.price); // sorted ascending price for example
  }, [
    properties,
    searchQuery,
    filterType,
    filterBedrooms,
    filterBathrooms,
    filterPriceMin,
    filterPriceMax,
  ]);

  return (
    <div className="mt-24 min-h-screen bg-gray-50 p-6">
      {/* Header with search + toggles */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">
          Find Your Perfect Property
        </h1>

        {/* Search bar */}
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

        {/* Buttons: filters & grid/list toggle */}
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
            {isGridView ? (
              <>
                <List className="w-5 h-5" />
                List View
              </>
            ) : (
              <>
                <Grid className="w-5 h-5" />
                Grid View
              </>
            )}
          </button>
        </div>
      </header>

      {/* Filters panel */}
      {showFilters && (
        <section className="mb-6 bg-white p-6 rounded-lg shadow max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Filter Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Property Type */}
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
                <option value="condo">Condo</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block mb-1 font-medium">Bedrooms (Min)</label>
              <input
                type="number"
                min="0"
                value={filterBedrooms}
                onChange={(e) => setFilterBedrooms(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="0"
              />
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block mb-1 font-medium">Bathrooms (Min)</label>
              <input
                type="number"
                min="0"
                value={filterBathrooms}
                onChange={(e) => setFilterBathrooms(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="0"
              />
            </div>

            {/* Price Min */}
            <div>
              <label className="block mb-1 font-medium">Min Price</label>
              <input
                type="number"
                min="0"
                value={filterPriceMin}
                onChange={(e) => setFilterPriceMin(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="₹0"
              />
            </div>

            {/* Price Max */}
            <div>
              <label className="block mb-1 font-medium">Max Price</label>
              <input
                type="number"
                min="0"
                value={filterPriceMax}
                onChange={(e) => setFilterPriceMax(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="₹Unlimited"
              />
            </div>
          </div>
        </section>
      )}

      {/* Main properties listing */}
      <main className="max-w-6xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500">Loading properties...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredProperties.length === 0 ? (
          <p className="text-center text-gray-500">No properties found.</p>
        ) : (
          <div
           className={
    isGridView
      ? "grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
      : "space-y-4"
  }
         
          >
 {filteredProperties.map((property) => (
<div
    key={property._id}
    className="bg-white rounded-lg shadow hover:shadow-lg cursor-pointer transition p-4 flex flex-col"
    onClick={() => setSelectedProperty(property)}
  >
    {/* Image */}
    <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
      {property.images && property.images.length > 0 ? (
        <img
          src={`http://localhost:5000${property.images[0]}`}
          alt={property.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}
    </div>

    {/* Location */}
    <div className="flex items-center text-sm text-gray-500 mb-1">
      <MapPin size={16} />
      <span className="ml-1">{property.location}</span>
    </div>

    {/* Title / Name */}
    <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
      {property.title}
    </h3>

    {/* Price */}
    <div className="text-blue-600 font-bold mb-3 text-xl">
      <IndianRupee size={18} className="inline" />
      <span className="ml-1">{Number(property.price).toLocaleString("en-IN")}</span>
    </div>

    {/* Beds, Baths, Area */}
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
))}


          </div>
        )}
      </main>

      {/* Property details modal */}
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
