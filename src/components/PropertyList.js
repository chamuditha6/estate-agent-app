import React from "react";
import PropertyCard from "./PropertyCard";

const PropertyList = ({ properties, onAddToFavorites }) => {
  // If properties is not an array or is empty, display a message
  if (!Array.isArray(properties) || properties.length === 0) {
    return <p>No properties available to display.</p>;
  }

  return (
    // Container for the list of property cards
    <div className="property-list">
      {/* Map through the properties and render a PropertyCard for each */}
      {properties.map((property) => (
        <PropertyCard 
          key={property.id} // Unique key for each PropertyCard
          property={property} // Pass the property details to the PropertyCard
          onAddToFavorites={onAddToFavorites} // Pass the function to handle adding to favorites
        />
      ))}
    </div>
  );
};

export default PropertyList;
