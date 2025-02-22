<Estate Agent Application>

A real estate web application built using React, which allows users to search, view, and save properties to their favorites list. The app provides features like property search with multiple criteria, image galleries, tabs for detailed property descriptions, and a responsive layout.

<Features>

#Property Search: Search properties by type, size, price, location, and more.
#Favorites: Add properties to favorites by dragging them into a sidebar or clicking a "favorite" icon. The favorites are saved in the local browser storage.
#Property Details: View detailed property information, including images, floor plans, and a Google Map view.
#Responsive Layout: The app is responsive, providing an optimized layout for both large screens and mobile devices.
#Local Storage: Save and remove properties from your favorites list, with data persisted across page reloads.
#React UI Widgets: Enhanced form elements (e.g., dropdowns, sliders) for a better user experience.

<Prerequisites>
Before you begin, ensure you have the following installed on your machine:

Node.js (preferably the latest stable version)
npm (Node Package Manager)

Navigate to the Project Directory
cd estate-agent-app

Install Dependencies
npm install

npm install react react-dom

npm install react-router-dom

npm install @mui/material @emotion/react @emotion/styled

npm install react-bootstrap bootstrap

npm install sass

npm install react-image-gallery

npm install eslint prettier eslint-config-prettier eslint-plugin-react

npm install @react-google-maps/api

npm install react-tabs

npm install react-dnd react-dnd-html5-backend

npm install localforage

npm install axios

npm install react-icons

<Installing All at Once>
npm install react react-dom react-router-dom @mui/material @emotion/react @emotion/styled react-bootstrap bootstrap react-image-gallery @react-google-maps/api react-tabs react-dnd react-dnd-html5-backend localforage axios react-icons sass

Start the Development Server
npm start

<Project Structure
src/components: Contains all React components used in the app (e.g., SearchForm, PropertyList, PropertyPage, FavoritesList, Footer).
src/data: Contains the JSON data for the properties (properties.json).
public/images: Contains all image assets used in the application.>

Usage
Searching for Properties
Use the Search Form: The search form allows you to filter properties by:

Property Type
Price Range
Number of Bedrooms
Location (by postcode)
Search Results: Once a search is made, matching properties will be displayed with their images, short description, and price.

View Detailed Property Info: Click on any property to view its full details, including images, a floor plan, and a Google Map.

Adding to Favorites
Drag and Drop: You can drag a property into the Favorites sidebar to add it to your favorite list.

Favorite Icon: Click the "favorite" icon on the property card to add it to your favorites.

Favorites Persistence: Favorites are saved to local storage and will persist even after refreshing the page.

Remove from Favorites: To remove a property from favorites, you can drag it out of the sidebar or click the delete button.

Property Page
Image Gallery: Each property has an image gallery that allows you to view all property images in full size.
Tabs: Use React UI Tabs to switch between the long description, floor plan, and Google Map of the property.
Responsive Design
The app layout is fully responsive, ensuring that it looks great on both large screens (e.g., desktops) and smaller devices (e.g., tablets and smartphones). Custom media queries are used to adapt the layout.
Security Considerations
HTML encoding is used throughout the app to avoid cross-site scripting (XSS).
Content Security Policy (CSP) headers should be configured on the server side (for production environments) to further protect against client-side security vulnerabilities.


Technologies Used
React: A JavaScript library for building user interfaces.
React Router: Used for routing and navigation within the app.
React UI: Libraries like Material UI or React Bootstrap can be used to enhance the UI components (though not fully implemented in this code yet).
CSS Grid/Flexbox: For creating responsive layouts.
Local Storage: To store and retrieve the favorites list on the client-side.


