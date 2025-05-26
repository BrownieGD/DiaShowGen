import express from 'express';
import GetSearchListArray from '../lib/images.js'

const app = express();
const port = 3000; 

app.set('view engine', 'ejs');
app.set('views', 'src/views')

app.get('/', (req, res) => {
  res.render("index", {})
});

app.get('/api/images', async (req, res) => {
    // Get the 'query' parameter from the URL query string (e.g., /api/images?query=cats)
    const searchQuery = req.query.query;

    if (!searchQuery) {
        // If no query is provided, send a 400 Bad Request error
        return res.status(400).json({ error: 'Please provide a search query using the "query" parameter.' });
    }

    try {
        // Call your search function with the provided query
        const imageUrls = await GetSearchListArray(searchQuery);

        // Send the result as JSON
        res.json(imageUrls);
    } catch (error) {
        // If there's an error during the search, send a 500 Internal Server Error
        console.error('Error in /api/images endpoint:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});