import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import PropertyList from "./components/PropertyList";
import FavoritesList from "./components/FavoritesList";
import PropertyPage from "./components/PropertyPage";
import Footer from "./components/Footer"; // Import the Footer component
import data from "./data/properties.json";

const App = () => {
    // Load properties data from a JSON file or default to an empty array if not available
    const properties = data?.properties || [];
    
    // State to manage the list of properties filtered by search criteria
    const [filteredProperties, setFilteredProperties] = useState(properties);
    
    // State to manage the user's list of favorite properties
    const [favorites, setFavorites] = useState([]);

    // Load favorites from localStorage when the component is mounted
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || []; // Parse saved favorites or default to an empty array
        setFavorites(savedFavorites); // Initialize the favorites state
    }, []);

    // Save the updated favorites list to localStorage whenever it changes
    useEffect(() => {
        if (favorites.length > 0) {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }, [favorites]);

    /**
     * Handles the search functionality.
     * Filters the properties list based on the user's search criteria (type, price, bedrooms, postcode).
     * @param {Object} criteria - The search criteria input by the user.
     */
    const handleSearch = (criteria) => {
        const results = properties.filter((property) => {
            const matchesType = criteria.type === "Any" || property.type === criteria.type; // Match property type
            const matchesPrice = property.price >= (criteria.minPrice || 0) && property.price <= (criteria.maxPrice || Infinity); // Match price range
            const matchesBedrooms = property.bedrooms >= (criteria.minBedrooms || 0) && property.bedrooms <= (criteria.maxBedrooms || Infinity); // Match bedroom count
            const matchesPostcode = criteria.postcode ? property.location.toLowerCase().includes(criteria.postcode.toLowerCase()) : true; // Match postcode
            return matchesType && matchesPrice && matchesBedrooms && matchesPostcode;
        });
        setFilteredProperties(results); // Update the filtered properties state
    };

    /**
     * Adds a property to the favorites list.
     * Prevents duplicates by checking if the property is already in the favorites.
     * @param {string} propertyId - The ID of the property to add to favorites.
     */
    const handleAddToFavorites = (propertyId) => {
        const propertyToAdd = properties.find((prop) => prop.id === propertyId); // Find the property by ID
        if (propertyToAdd && !favorites.some((fav) => fav.id === propertyId)) { // Check for duplicates
            setFavorites((prevFavorites) => [...prevFavorites, propertyToAdd]); // Add property to favorites
        }
    };

    /**
     * Removes a property from the favorites list.
     * @param {string} propertyId - The ID of the property to remove from favorites.
     */
    const handleRemoveFromFavorites = (propertyId) => {
        const updatedFavorites = favorites.filter((fav) => fav.id !== propertyId); // Filter out the property by ID
        setFavorites(updatedFavorites); // Update the favorites state
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save changes to localStorage
    };

    /**
     * Adds a property to the favorites list via drag-and-drop.
     * This is a wrapper for handleAddToFavorites.
     * @param {string} propertyId - The ID of the property to add.
     */
    const handleDropToAdd = (propertyId) => {
        handleAddToFavorites(propertyId); // Add property using existing function
    };

    return (
        <Router>
            <div className="app-container">
                {/* Main content area for displaying the application */}
                <div className="main-content">
                    <Routes>
                        {/* Route for the homepage: displays search form and property list */}
                        <Route 
                            path="/" 
                            element={
                                <div>
                                    <h1>Estate Agent Application</h1>
                                    {/* Search form component */}
                                    <SearchForm onSearch={handleSearch} />
                                    {/* Property list component */}
                                    <PropertyList 
                                        properties={filteredProperties} 
                                        onAddToFavorites={handleAddToFavorites} 
                                        favorites={favorites}  // Pass the favorites list
                                    />
                                </div>
                            } 
                        />
                        {/* Route for individual property details */}
                        <Route 
                            path="/property/:id" 
                            element={
                                <PropertyPage 
                                    properties={properties} 
                                    onAddToFavorites={handleAddToFavorites} 
                                />
                            } 
                        />
                        {/* Catch-all route: redirects to homepage */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
                
                {/* Sidebar for displaying the user's favorite properties */}
                <div className="sidebar">
                    <FavoritesList 
                        favorites={favorites} 
                        onRemoveFromFavorites={handleRemoveFromFavorites} 
                        onClearFavorites={() => { 
                            setFavorites([]); // Clear the favorites state
                            localStorage.removeItem("favorites"); // Remove favorites from localStorage
                        }} 
                        onDropToAdd={handleDropToAdd} 
                    />
                </div>
                
                {/* Footer component */}
                <Footer /> {/* Footer without search properties and favorites */}
            </div>
        </Router>
    );
};

export default App;
