const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler');

// express app initialization
const app = express();
app.use(express.json());

// Database connection with mongoose
mongoose
    .connect('mongodb://localhost/todos', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connection Successfull'))
    .catch((err) => console.log(err));

// Application Routes
app.use('/todo', todoHandler);

// Default error handler

function errorHandler(err, req, res, next) {
    if (res.headersSend) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

app.listen(3000, () => {
    console.log('app listening on port 3000');
});
