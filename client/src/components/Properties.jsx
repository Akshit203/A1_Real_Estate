import { MapPin, BedDouble, Bath, Maximize, IndianRupee } from "lucide-react";

const Properties = () => {
  const properties = [
    {
      title: "Luxury Villa",
      location: "Chandigarh, IN",
      beds: 3,
      baths: 2,
      sqft: 1200,
      price: 25000000,
    },
    {
      title: "Luxury Villa",
      location: "Chandigarh, IN",
      beds: 5,
      baths: 4,
      sqft: 3500,
      price: 75000000,
    },
    {
      title: "Luxury Villa",
      location: "Chandigarh, IN",
      beds: 2,
      baths: 1,
      sqft: 800,
      price: 18000000,
    },
    {
      title: "Luxury Villa",
      location: "Chandigarh, IN",
      beds: 5,
      baths: 4,
      sqft: 3500,
      price: 75000000,
    },
    {
        title: "Luxury Villa",
        location: "Chandigarh, IN",
        beds: 3,
        baths: 2,
        sqft: 1200,
        price: 25000000,
      },
      {
        title: "Luxury Villa",
        location: "Chandigarh, IN",
        beds: 5,
        baths: 4,
        sqft: 3500,
        price: 75000000,
      },
      {
        title: "Luxury Villa",
        location: "Chandigarh, IN",
        beds: 2,
        baths: 1,
        sqft: 800,
        price: 18000000,
      },
      {
        title: "Luxury Villa",
        location: "Chandigarh, IN",
        beds: 5,
        baths: 4,
        sqft: 3500,
        price: 75000000,
      },

  ];

  return (
    <div className="flex flex-wrap gap-4 m-2 p-4 justify-center">
      {properties.map((property, index) => (
        <div key={index} className="border border-gray-300 p-4 m-3 rounded-lg w-72">
          {/* Property Title */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1 text-blue-500" />
            {property.location}
          </div>

          {/* Property Details */}
      

          {/* Price */}
          <div className="flex items-center text-blue-600 font-bold text-lg">
            <IndianRupee className="h-5 w-5 mr-1" />
            {Number(property.price).toLocaleString("en-IN")}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Properties;
