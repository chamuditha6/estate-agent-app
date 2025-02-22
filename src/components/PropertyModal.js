import React from 'react';

const PropertyModal = ({ property, onClose }) => {
    // If no property is passed, return null to not render the modal
    if (!property) return null;

    return (
        // Overlay for the modal (clicking outside the modal closes it)
        <div className="modal-overlay" onClick={onClose}>
            {/* Modal content, prevents click event from propagating to the overlay */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Property details */}
                <h2>{property.type} - £{property.price.toLocaleString()}</h2>
                <img src={property.picture} alt={property.type} />
                <p>{property.longDescription}</p>

                {/* Close button */}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default PropertyModal;
