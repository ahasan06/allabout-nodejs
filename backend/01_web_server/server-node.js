const http = require('http'); // Import the HTTP module for creating the server
const hostname = '127.0.0.1'; // Localhost IP address used for testing
const port = 3000; // Port number for the server

// Create the server
const server = http.createServer((req, res) => {
    // Explicitly handle defined routes
    if (req.url === '/') { // Check if the request URL is root
        res.statusCode = 200; // Status code 200 means the request was successful
        res.setHeader('Content-Type', 'text/plain'); // Set the content type to plain text
        res.end('Thanks for visiting our homepage!\n'); // Send the response to the client
    } else if (req.url === '/ice-tea') { // Check if the request URL is /ice-tea
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Thanks for ordering ice tea, it is really cold!\n'); // Respond with a specific message
    } else { // Handle all other undefined routes
        res.statusCode = 404; // Status code 404 means not found
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 - Page not found\n'); // Send a 404 response
    }
});

// Start the server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
