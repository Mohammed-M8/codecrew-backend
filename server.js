const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');


const authRouter = require('./Routes/authRouter');
const isSignedIn = require('./Middleware/isSignedIn');

require('./config/database')

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.use('/auth', authRouter)


// only protected
app.use(isSignedIn)

app.listen(3000, () => {
    console.log('The express app is ready!');
});