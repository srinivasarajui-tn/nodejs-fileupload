// Load the necessary modules and define a port
const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const uploadRoute = require('./upload');

const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`

 const PrintMemoryUsage = () => {
const memoryData = process.memoryUsage()

const memoryUsage = {
                rss: `${formatMemoryUsage(memoryData.rss)} -> Resident Set Size - total memory allocated for the process execution`,
                heapTotal: `${formatMemoryUsage(memoryData.heapTotal)} -> total size of the allocated heap`,
                heapUsed: `${formatMemoryUsage(memoryData.heapUsed)} -> actual memory used during the execution`,
                external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
}
console.log(memoryUsage);
}

// Add a basic route to check if server's up
app.get('/', (req, res) => {
  res.status(200).send(`Server up and running`);
});
const ensureAuthenticated = (req, res, next) => {

  console.log('token:', req.headers['x-security-token']);
  if (req.headers['x-security-token'] !== 'secret') {
    res.status(401).send('Unauthorized');
    return;
  }
  next()
}
app.use(uploadRoute);
//app.use('/files', ensureAuthenticated);
app.use('/files',express.static('/data/files'));
const data = setInterval(() => {
  PrintMemoryUsage();
}, 1000);
// Mount the app to a port
app.listen(port, () => {
  console.log('Server running at http://127.0.0.1:3000/');
});

