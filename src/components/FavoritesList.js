import React from "react";

// FavoritesList component for managing a draggable list of favorite properties
const FavoritesList = ({
  favorites, // Array of favorite properties
  onRemoveFromFavorites, // Function to remove a property from favorites
  onClearFavorites, // Function to clear all favorites
  onDropToAdd, // Function to add a property to favorites via drop
}) => {
  // Allow drop by preventing the default behavior
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop event to add a property to the favorites list
  const handleDrop = (e) => {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData("propertyId"); // Retrieve property ID from the dataTransfer object
    if (propertyId) {
      onDropToAdd(propertyId); // Call the function to add the property
    }
  };

  // Handle drag start event and attach the property ID to the dataTransfer object
  const handleDragStart = (e, propertyId) => {
    e.dataTransfer.setData("propertyId", propertyId); // Store property ID
    e.dataTransfer.effectAllowed = "move"; // Indicate the type of operation
  };

  // Handle drag end event to remove a property if dropped outside the list
  const handleDragEnd = (e, propertyId) => {
    const dropTarget = document.elementFromPoint(e.clientX, e.clientY); // Get the element at the drop point
    const isOutside = !dropTarget.closest(".favorites-list-container"); // Check if dropped outside the container
    if (isOutside) {
      onRemoveFromFavorites(propertyId); // Remove the property if dropped outside
    }
  };

  return (
    <div
      className="favorites-list-container" // Class name for styling the container
      onDragOver={handleDragOver} // Enable drop functionality
      onDrop={handleDrop} // Handle drop event
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "5px",
        width: "300px",
      }}
    >
      <h3>Favorites</h3>
      {/* Display a message if no favorites are available */}
      {favorites.length === 0 ? (
        <p>Drag properties here to add to favorites.</p>
      ) : (
        <ul>
          {favorites.map((property) => (
            <li
              key={property.id} // Unique key for each property
              draggable // Enable drag functionality
              onDragStart={(e) => handleDragStart(e, property.id)} // Handle drag start
              onDragEnd={(e) => handleDragEnd(e, property.id)} // Handle drag end
              style={{ marginBottom: "10px", cursor: "grab" }}
            >
              {/* Display property details */}
              <span>
                {property.type} - £{property.price.toLocaleString()}
              </span>
              {/* Button to remove the property from favorites */}
              <button
                onClick={() => onRemoveFromFavorites(property.id)}
                style={{
                  marginLeft: "10px",
                  padding: "2px 5px",
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* Clear all favorites button, visible only if favorites exist */}
      {favorites.length > 0 && (
        <button
          onClick={onClearFavorites} // Clear all favorites on click
          style={{
            marginTop: "10px",
            padding: "5px 10px",
          }}
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default FavoritesList;
