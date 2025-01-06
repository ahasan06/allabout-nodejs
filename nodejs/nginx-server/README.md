
# Understanding and Building an HTTP Server in Node.js

We are building an HTTP server using Node.js that handles requests from clients (like browsers). The server serves 
different file types (HTML, CSS, JS, images) and gracefully handles errors like missing files (404) or server errors (500).

---

## Breaking Down the Code (Banglish Explanation)

### 1. HTTP Module Import:
```javascript
const http = require('http'); // Import the HTTP module
```
**What it does:** The HTTP module is a built-in library in Node.js. It allows us to create an HTTP server.

**Example:** Creating a simple server:
```javascript
const http = require('http');
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello, World!</h1>');
}).listen(3000, () => console.log('Server running on port 3000'));
```

**Output:** Browsing `http://localhost:3000` will display "Hello, World!".

---

### 2. File System (FS) Module Import:
```javascript
const fs = require('fs'); // Import the file system module
```
**What it does:** This module lets us read, write, and manage files on the server.

**Example:** Reading a file:
```javascript
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) console.error(err);
    else console.log(data);
});
```

---

### 3. Path Module Import:
```javascript
const path = require('path'); // Import the path module
```
**What it does:** The path module helps manage file paths in a platform-independent way.

**Example:** Joining file paths:
```javascript
const fullPath = path.join(__dirname, 'folder', 'file.txt');
console.log(fullPath);
```
**Output:** On Windows: `C:\folder\file.txt` | On Linux: `/folder/file.txt`.

---

### 4. Environment Port:
```javascript
const PORT = process.env.PORT || 3000; // Set the port number
```
**What it does:** Sets the server's port dynamically if `process.env.PORT` is defined; otherwise, it defaults to 3000.

---

### 5. __dirname's Use:
```javascript
const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
```
**What it does:** `__dirname` gives the absolute path of the current directory.

**Example:** `__dirname` in `/project/server.js` would return `/project`.

---

### 6. HTTP Server Creation:
```javascript
const server = http.createServer((req, res) => {
    console.log(req.url);
});
```
**What it does:** Creates the server and logs client requests.

---

### 7. Resolving File Path:
```javascript
const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
```
**What it does:** Serves `index.html` by default for `/` requests, or serves the requested file.

---

### 8. MIME Types Resolve:
```javascript
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
};
const contentType = mimeTypes[extname] || 'application/octet-stream';
```
**What it does:** Determines the type of file (e.g., `text/html` for `.html`).

---

### 9. fs.readFile (File Read):
```javascript
fs.readFile(filePath, (err, data) => {
    if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>');
    } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data, 'utf-8');
    }
});
```
**What it does:** Reads the file and serves it to the client. Handles errors gracefully (404 or 500).

---

## Working Flow Summary
1. The client sends a request (e.g., `/index.html`).
2. The server resolves the file path (`filePath`).
3. Reads the file using `fs.readFile`.
4. If the file exists, serves the file content to the client.
5. If the file is missing, responds with a 404 error.

---

## Example Scenarios:
### 1. Requesting `/index.html`:
- File found -> Server serves `index.html`.

### 2. Requesting `/style.css`:
- File found -> Server serves `style.css`.

### 3. Requesting a non-existent file:
- File not found -> Server responds with 404.

---

Now you have a fully functional HTTP server!
