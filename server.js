const express = require('express');
const errorHandler = require('./middleware/errorhandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();

// Connect to MongoDB using Mongoose
connectDb();
const app = express();

const port = process.env.PORT || 5000;

// Middleware to parse JSON request bodies

app.use(express.json());

app.use('/api/contacts', require('./routes/contactRoutes'));

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port} `);
});
