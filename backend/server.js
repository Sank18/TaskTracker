const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
//response jo milega us response mai status code hoga ki req fulfill hui yaa nahi huai us basis pai error generate hoga
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
//env mai jitne bhi variables hote wo process to env sai refer hote 

connectDB();

const app = express();

//middleware so that we can access the req.body in POST reqs
app.use(express.json());

//
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin : ["https://localhost:3000"]
  })
)

app.use('/api/goals', require('./routes/goalRoutes'));
//crud operations on goals
app.use('/api/users', require('./routes/userRoutes'));
//jwt create login logout register

//override the default express error handler
app.use(errorHandler);
//why i have used this in last


app.listen(port, () => console.log(`Server started on port ${port}`));