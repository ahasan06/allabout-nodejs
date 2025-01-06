const http = require('http'); // Import the HTTP module
const fs = require('fs'); // Import the file system module
const path = require('path'); // Import the path module
const PORT = process.env.PORT || 3000; // Set the port number

// Create the HTTP server
const server = http.createServer((req, res) => {
    console.log(`Request URL: ${req.url}`); // Log the requested URL

    // Resolve the file path
    const filePath = path.join(
        __dirname,
        req.url === '/' ? 'index.html' : req.url
    ); // Default to index.html if root is requested

    // Get the file extension
    const extname = String(path.extname(filePath).toLowerCase());

    // Define MIME types
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.json': 'application/json',
        '.txt': 'text/plain',
    };

    // Get the content type of the file
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Read and serve the file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                // Other errors (e.g., permission issues)
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`<h1>500 - Server Error</h1><p>${err.message}</p>`, 'utf-8');
            }
        } else {
            // File found, serve the content
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data, 'utf-8');
        }
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
