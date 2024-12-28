require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/dbConfig'); // MongoDB connection function
const authRoutes = require('./routes/authRoute'); // Auth routes
const cartRoutes = require('./routes/cartRoute');


const app = express();
const port = 5000;

connectDB();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/cart', cartRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});