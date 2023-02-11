const express = require('express');
const app = express();
require('dotenv').config();

const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));
app.use(express.json());

// routes
app.get('/hello', (req, res) => {
    res.send('<h1>Task manager App</h1>');
});

app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

start();
