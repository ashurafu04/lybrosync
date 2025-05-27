const express = require('express');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

//middleware to parse json bodies
app.use(express.json());

//route usage
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/admin', adminRoutes);

//exporting app instance for use in server.js and testing
module.exports = app;