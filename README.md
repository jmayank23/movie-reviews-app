# Movie Reviews App

A fullstack web application that allows users to browse movies and add, edit, or delete reviews for specific movies. The application uses The Movie Database (TMDB) API to fetch and display popular movies, and provides a custom backend to store and manage user reviews. Users can:
- Browse popular movies or search for specific titles
- View all reviews for a specific movie
- Add new reviews with user attribution
- Edit existing reviews
- Delete reviews

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Fetch API for HTTP requests

### Backend
- Node.js
- Express.js
- MongoDB Atlas for cloud database hosting

### External APIs
- TMDB (The Movie Database) API for movie data

## Setup Instructions

Clone the repository: `git clone https://github.com/jmayank23/movie-reviews-app.git`

### Prerequisites
- Node.js (v12 or higher)
- npm (v6 or higher)
- MongoDB Atlas account (or local MongoDB installation)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure MongoDB connection:
   Create a `.env` file in the backend directory with your MongoDB connection details:
   ```
   MONGO_USERNAME=your_username
   MONGO_PASSWORD=your_password
   MONGO_CLUSTER=your_cluster_address
   PORT=8000
   ```
   
   The application will automatically use these environment variables to connect to your MongoDB Atlas cluster.

4. Start the backend server:
   ```bash
   node index.js
   ```
   The server will start running on port 8000, and you should see:
   ```
   Server listening on port 8000
   Using MongoDB username: your_username
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. The frontend is static HTML/CSS/JS, so you can serve it using any static file server. For development, you can use:
   ```bash
   npx serve
   ```
   Or any other static file server of your choice.

## Using the Application

1. Open your browser and navigate to the frontend URL (typically http://localhost:5000 or similar, depending on your static server)

2. The main page displays popular movies from TMDB. You can:
   - Browse through the displayed movies
   - Use the search bar to find specific movies by title

3. Click on the "reviews" link under any movie to access its review page

4. On the movie review page, you can:
   - View all existing reviews for the movie
   - Add a new review by filling out the "New Review" form
   - Edit your reviews by clicking the "Edit" link
   - Delete reviews by clicking the "Delete" link

## Application Architecture

### Backend Structure

The backend follows a layered architecture:

1. **API Routes** (`api/reviews.route.js`): Defines the REST endpoints
2. **Controllers** (`api/reviews.controller.js`): Handles HTTP requests and responses
3. **Data Access Objects** (`dao/reviewsDAO.js`): Manages database operations
4. **Server Configuration** (`server.js`, `index.js`): Sets up Express and connects to MongoDB

### API Endpoints

The backend provides the following RESTful API endpoints:

- `GET /api/v1/reviews/movie/:id` - Get all reviews for a specific movie
- `GET /api/v1/reviews/:id` - Get a specific review by ID
- `POST /api/v1/reviews/new` - Create a new review
- `PUT /api/v1/reviews/:id` - Update an existing review
- `DELETE /api/v1/reviews/:id` - Delete a review

### Frontend Structure

The frontend consists of:

1. **Main Page** (`index.html`, `script.js`): Displays and searches for movies
2. **Review Page** (`movie.html`, `movie.js`): Displays and manages reviews for a specific movie
3. **Styling** (`style.css`): Provides consistent styling across the application

### Data Flow

1. The frontend fetches movie data from TMDB API
2. When a user selects a movie, they're directed to the review page for that movie
3. The review page fetches review data from the backend API
4. User actions (adding, editing, deleting reviews) send requests to the backend API
5. The backend processes these requests and updates the MongoDB database
6. The page reloads to display the updated data

## Troubleshooting

- If you encounter CORS issues, ensure both backend and frontend servers are running and that the APILINK in `movie.js` points to the correct backend URL.
- If reviews aren't loading, check the browser console for errors and verify that the MongoDB connection is established.
- For any MongoDB connection issues, verify your credentials and network connection to MongoDB Atlas.

## License

This project is open-source and available under the MIT License. 