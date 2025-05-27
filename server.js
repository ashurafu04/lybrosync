require('dotenv').config();
const app = require('./src/app');
const pool = require('./src/config/db');

const PORT = process.env.PORT || 3000;

// Test database connection before starting the server
pool.query('SELECT 1')
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch(err => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });
