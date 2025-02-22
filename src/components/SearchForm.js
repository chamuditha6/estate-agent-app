import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchForm = ({ onSearch }) => {
  // State to manage the form input values
  const [criteria, setCriteria] = useState({
    type: null,         // Property type (e.g., House, Flat)
    minPrice: "",       // Minimum price filter
    maxPrice: "",       // Maximum price filter
    minBedrooms: "",    // Minimum number of bedrooms filter
    maxBedrooms: "",    // Maximum number of bedrooms filter
    postcode: "",       // Postcode filter
    startDate: null,    // Start date for date range filter
    endDate: null,      // End date for date range filter
  });

  // Handle changes in input fields (e.g., text, number)
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validation for numeric inputs (price, bedrooms)
    if (["minPrice", "maxPrice", "minBedrooms", "maxBedrooms"].includes(name)) {
      if (!/^\d*$/.test(value)) return; // Allow only numeric input
    }

    // Update the state with the new input value
    setCriteria({ ...criteria, [name]: value });
  };

  // Handle changes in the property type dropdown (React Select)
  const handleTypeChange = (selectedOption) => {
    // Update the property type in the state based on the selected option
    setCriteria({ ...criteria, type: selectedOption ? selectedOption.value : null });
  };

  // Handle date selection (Start Date or End Date)
  const handleDateChange = (field, date) => {
    // Update the state with the selected date for the specified field
    setCriteria({ ...criteria, [field]: date });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page on submit

    // Validate and clean up the criteria before triggering the search
    const validatedCriteria = { ...criteria };

    // Remove empty or null fields to ensure the search is clean
    Object.keys(validatedCriteria).forEach((key) => {
      if (validatedCriteria[key] === "" || validatedCriteria[key] === null) {
        delete validatedCriteria[key];
      }
    });

    // Pass the validated criteria to the onSearch function
    onSearch(validatedCriteria);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Search Properties</h2>

      {/* Property Type Dropdown */}
      <label htmlFor="type">Property Type:</label>
      <Select
        id="type"
        options={[
          { value: "House", label: "House" },    // Option for House
          { value: "Flat", label: "Flat" },      // Option for Flat
          { value: "Any", label: "Any" },        // Option for Any type of property
        ]}
        placeholder="Select Property Type"        // Placeholder text
        onChange={handleTypeChange}               // Callback for change event
        isClearable                              // Allows clearing the selected value
      />

      {/* Price Range Inputs */}
      <label htmlFor="minPrice">Price Range:</label>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="number"
          id="minPrice"
          name="minPrice"
          placeholder="Min Price"
          value={criteria.minPrice}
          onChange={handleInputChange}           // Call handleInputChange when input changes
        />
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          placeholder="Max Price"
          value={criteria.maxPrice}
          onChange={handleInputChange}           // Call handleInputChange when input changes
        />
      </div>

      {/* Bedroom Range Inputs */}
      <label htmlFor="minBedrooms">Bedrooms:</label>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="number"
          id="minBedrooms"
          name="minBedrooms"
          placeholder="Min Bedrooms"
          value={criteria.minBedrooms}
          onChange={handleInputChange}           // Call handleInputChange when input changes
        />
        <input
          type="number"
          id="maxBedrooms"
          name="maxBedrooms"
          placeholder="Max Bedrooms"
          value={criteria.maxBedrooms}
          onChange={handleInputChange}           // Call handleInputChange when input changes
        />
      </div>

      {/* Postcode Input */}
      <label htmlFor="postcode">Postcode:</label>
      <input
        type="text"
        id="postcode"
        name="postcode"
        placeholder="Enter Postcode"
        value={criteria.postcode}
        onChange={handleInputChange}           // Call handleInputChange when input changes
      />

      {/* Date Range Picker */}
      <label>Date Added:</label>
      <div style={{ display: "flex", gap: "10px" }}>
        <DatePicker
          selected={criteria.startDate}            // Set the selected start date
          onChange={(date) => handleDateChange("startDate", date)} // Handle start date change
          placeholderText="Start Date"             // Placeholder text
        />
        <DatePicker
          selected={criteria.endDate}              // Set the selected end date
          onChange={(date) => handleDateChange("endDate", date)} // Handle end date change
          placeholderText="End Date"               // Placeholder text
        />
      </div>

      {/* Search Button */}
      <button type="submit" style={{ marginTop: "20px", padding: "10px 20px" }}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
