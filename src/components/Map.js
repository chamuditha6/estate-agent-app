import React from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

const Map = ({ location, coordinates }) => {
    // Load the Google Maps script and handle loading errors
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['marker'], // Load the marker library for AdvancedMarkerElement
        version: 'weekly', // Ensure the latest version is used
    });

    const mapStyles = {
        height: "400px", // Set a fixed height for the map
        width: "100%", // Make the map responsive with full width
    };

    const defaultCenter = {
        lat: 51.509865, // Default latitude if coordinates are not provided
        lng: -0.118092, // Default longitude if coordinates are not provided
    };

    const center = coordinates || defaultCenter; // If coordinates are available, use them; otherwise, use default

    if (loadError) {
        console.error("Google Maps loading error:", loadError);  // Log the detailed error message
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps...</div>; // Show a loading message while the map is loading
    }

    // Create an instance of the AdvancedMarkerElement after map load
    const createMarker = (map) => {
        const marker = new google.maps.marker.AdvancedMarkerElement({
            position: center,
            map: map,
            title: location,
        });
    };

    return (
        <GoogleMap
            mapContainerStyle={mapStyles} // Apply custom styles
            zoom={14} // Set zoom level for the map
            center={center} // Center map on the provided coordinates or defaults
            onLoad={createMarker} // Add marker when map loads
        >
        </GoogleMap>
    );
};

export default Map;
