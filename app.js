const express = require('express');
const app = express();
const morgan = require('morgan');

const locateRoutes = require('./api/routes/locate');

app.use(morgan('dev'));

// Routes which should handle requests
app.use('/locate', locateRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

module.exports = app;
