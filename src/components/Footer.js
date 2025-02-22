import React from "react";

const Footer = () => {
    return (
        // Footer section with inline styles for layout and appearance
        <footer style={{
            textAlign: 'center', // Center the text inside the footer
            padding: '20px', // Add padding around the content
            backgroundColor: '#f1f1f1', // Set a light background color
            marginTop: '20px', // Add space above the footer
        }}>
            {/* Copyright text with the year and application name */}
            <p>&copy; 2025 Estate Agent Application. All rights reserved.</p>
            {/* Contact information */}
            <p>Contact us: info@estateagent.com</p>
        </footer>
    );
};

export default Footer;
