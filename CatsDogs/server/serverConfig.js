const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    const allowedOrigins = process.env.CLIENT_URL 
        ? process.env.CLIENT_URL.split(',').map(url => url.trim())
        : ["http://localhost:3000"];
    
    app.use(cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(null, true);
            }
        },
        credentials: true
    }));
};