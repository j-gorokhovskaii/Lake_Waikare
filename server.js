const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif'
};

const server = http.createServer((req, res) => {
    // If the URL is '/', serve 'home.html'
    let filePath = req.url === '/' ? 'home.html' : req.url;
    
    // Remove any query parameters
    filePath = filePath.split('?')[0];
    
    // Get the full path
    filePath = path.join(__dirname, filePath);

    // Get the file extension
    const ext = path.extname(filePath);
    
    // Get the MIME type
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Read and serve the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                fs.readFile(path.join(__dirname, '404.html'), (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                });
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
    console.log('To stop the server, press Ctrl+C');
}); 