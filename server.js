import app from './app.js';

const port = 3000; // You can use the same port as in app.js or choose a different one for testing

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});