import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropertyModal from './PropertyModal';

const PropertyCard = ({ property, onAddToFavorites, favorites = [] }) => {
    // State to manage the modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Check if the property is already in favorites
    const isFavorited = favorites.some(fav => fav.id === property.id);

    // Handle the drag start event to store the property ID for dragging
    const handleDragStart = (e) => {
        e.dataTransfer.setData("propertyId", property.id);
    };

    // Handle the click on the favorite button (add/remove from favorites)
    const handleFavoriteClick = (e) => {
        e.stopPropagation(); // Prevent the event from propagating to the parent
        if (!isFavorited) {
            // If not in favorites, add to favorites
            onAddToFavorites(property.id);
        } else {
            // If already in favorites, remove it
            onAddToFavorites(property.id, true);
        }
    };

    return (
        <>
            {/* Property card container */}
            <div
                className="property-card"
                draggable // Make the card draggable
                onDragStart={handleDragStart} // Attach drag start event
                style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}
            >
                {/* Link to the property details page */}
                <Link to={`/property/${property.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img src={property.picture} alt={property.type} style={{ width: '100%', borderRadius: '5px' }} />
                    <h3>{property.type}</h3>
                    <p>{property.location}</p>
                    <p className="property-price">Price: £{property.price.toLocaleString()}</p>
                </Link>

                {/* View Details Button */}
                <Link to={`/property/${property.id}`}>
                    <button style={{
                        marginTop: '10px', 
                        padding: '5px 10px', 
                        backgroundColor: '#4CAF50', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px', 
                        transition: 'background-color 0.3s'
                    }}>
                        View Details
                    </button>
                </Link>

                {/* Add to Favorites Button */}
                <button 
                    onClick={handleFavoriteClick}  // Single onClick handler for add/remove favorite
                    style={{
                        marginTop: '10px', 
                        padding: '5px 15px', 
                        backgroundColor: isFavorited ? '#FF5733' : '#2196F3', // Change background color based on favorite status
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        marginRight: '10px', // Add space between the button and the heart icon
                        transition: 'background-color 0.3s, transform 0.2s',
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = isFavorited ? '#FF4500' : '#1976D2'} // Hover effect
                    onMouseLeave={(e) => e.target.style.backgroundColor = isFavorited ? '#FF5733' : '#2196F3'} // Reset hover effect
                >
                    {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>

                {/* Favorite Heart Icon */}
                <button 
                    onClick={handleFavoriteClick}  // Single onClick handler for favorite heart
                    style={{
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer', 
                        color: isFavorited ? '#FF5733' : '#ccc', // Color based on favorited status
                        fontSize: '24px',
                        padding: '5px',
                        transition: 'color 0.3s, transform 0.2s',
                    }}
                    onMouseEnter={(e) => e.target.style.color = isFavorited ? '#FF4500' : '#2196F3'} // Hover effect
                    onMouseLeave={(e) => e.target.style.color = isFavorited ? '#FF5733' : '#ccc'} // Reset hover effect
                >
                    {isFavorited ? '❤️' : '🤍'} {/* Change the heart icon based on favorited status */}
                </button>
            </div>

            {/* Modal for quick view (conditional rendering based on modal state) */}
            <PropertyModal property={isModalOpen ? property : null} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default PropertyCard;
