// src/components/PropertyPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, Modal, Box, IconButton, Typography, Tooltip, Card, CardContent } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const PropertyPage = ({ properties, onAddToFavorites }) => {
    // Extract property ID from the URL using useParams hook
    const { id } = useParams();
    // Find the property that matches the provided ID
    const property = properties.find((prop) => prop.id === id);

    // State to manage selected tab and image/modal display
    const [tabValue, setTabValue] = React.useState(0);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    // Handle tab changes (Description, Floor Plan, Map)
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // Handle click on an image thumbnail to enlarge it
    const handleImageClick = (image, index) => {
        setSelectedImage(image);
        setCurrentImageIndex(index);
    };

    // Close the modal for the enlarged image
    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    // Handle the "Next" image button in modal (navigate to the next image)
    const handleNextImage = React.useCallback(() => {
        if (property.images && currentImageIndex < property.images.length - 1) {
            setCurrentImageIndex((prevIndex) => prevIndex + 1);
            setSelectedImage(property.images[currentImageIndex + 1]);
        }
    }, [property.images, currentImageIndex]);

    // Handle the "Previous" image button in modal (navigate to the previous image)
    const handlePreviousImage = React.useCallback(() => {
        if (property.images && currentImageIndex > 0) {
            setCurrentImageIndex((prevIndex) => prevIndex - 1);
            setSelectedImage(property.images[currentImageIndex - 1]);
        }
    }, [property.images, currentImageIndex]);

    // Handle keyboard navigation for image carousel (ArrowRight, ArrowLeft)
    React.useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                handleNextImage();
            } else if (event.key === 'ArrowLeft') {
                handlePreviousImage();
            }
        };

        // Listen for keydown events when an image is selected
        if (selectedImage) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedImage, handleNextImage, handlePreviousImage]);

    // If the property doesn't exist, show an error message
    if (!property) {
        return <p style={{ textAlign: 'center', color: 'red' }}>Property not found!</p>;
    }

    // Define Google Map style and center (uses the property's latitude and longitude)
    const mapContainerStyle = {
        width: '100%',
        height: '400px',
        borderRadius: '10px',
    };

    const center = {
        lat: property.latitude || 51.5074,  // Default to London if no coordinates available
        lng: property.longitude || -0.1278,  // Default to London if no coordinates available
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* Property Title and Price */}
            <Typography variant="h4" component="h1" gutterBottom>
                {property.type} - £{property.price.toLocaleString()}
            </Typography>

            {/* Property Main Image */}
            <img src={property.picture} alt={property.type} style={{ width: '100%', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }} />

            {/* Add to Favorites Button */}
            <button onClick={() => onAddToFavorites(property.id)} style={{ padding: '10px 20px', marginTop: '10px' }}>
                Add to Favorites
            </button>

            {/* Additional Images Section */}
            <Typography variant="h5" component="h2" gutterBottom>Additional Images</Typography>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {property.images?.length > 0 ? (
                    property.images.map((img, idx) => (
                        <Tooltip key={idx} title="Click to enlarge">
                            <img src={img} alt={`Thumbnail ${idx + 1}`} style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '10px', border: '2px solid #ddd', cursor: 'pointer', transition: 'transform 0.3s' }} 
                                 onClick={() => handleImageClick(img, idx)} 
                                 onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')} 
                                 onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')} />
                        </Tooltip>
                    ))
                ) : (
                    <p>No additional images available.</p>
                )}
            </div>

            {/* Tabs for Description, Floor Plan, and Map */}
            <Tabs value={tabValue} onChange={handleTabChange} style={{ marginTop: '20px', marginBottom: '20px' }} indicatorColor="primary" textColor="primary" centered>
                <Tab label="Description" />
                <Tab label="Floor Plan" />
                <Tab label="Google Map" />
            </Tabs>

            {/* Tab Content */}
            <div>
                {tabValue === 0 && (
                    <div style={{ marginTop: '20px' }}>
                        <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '10px' }}>Property Description</Typography>
                        <Card style={{ borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', padding: '20px', backgroundColor: '#f9f9f9', maxWidth: '800px', margin: '0 auto' }}>
                            <CardContent>
                                <Typography variant="body1" style={{ lineHeight: '1.8', color: '#333' }}>{property.longDescription}</Typography>
                            </CardContent>
                        </Card>
                    </div>
                )}
                {tabValue === 1 && (
                    <div>
                        <Typography variant="h6">Floor Plan</Typography>
                        {property.floorPlan ? (
                            <img src={property.floorPlan} alt="Floor Plan" style={{ width: '100%', maxWidth: '600px', borderRadius: '10px', marginTop: '20px' }} />
                        ) : (
                            <p>Floor plan is not available for this property.</p>
                        )}
                    </div>
                )}
                {tabValue === 2 && (
                    <div>
                        <Typography variant="h6">Google Map</Typography>
                        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={center}
                                zoom={14}
                            >
                                <Marker position={center} />
                            </GoogleMap>
                        </LoadScript>
                    </div>
                )}
            </div>

            {/* Modal for Viewing Larger Image */}
            {selectedImage && (
                <Modal open={!!selectedImage} onClose={handleCloseModal}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        maxWidth: '90%',
                        maxHeight: '90%',
                        overflow: 'auto',
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <img src={selectedImage} alt="Selected" style={{ width: '100%', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
                            <IconButton onClick={handlePreviousImage} disabled={currentImageIndex === 0}>
                                <ArrowBackIosNewIcon />
                            </IconButton>
                            <IconButton onClick={handleNextImage} disabled={currentImageIndex === property.images.length - 1}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </div>
                    </Box>
                </Modal>
            )}
        </div>
    );
};

export default PropertyPage;
