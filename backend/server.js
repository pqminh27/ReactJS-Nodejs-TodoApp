const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const api_router = require("./controllers/api_router");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/static", express.static("../client/public")); // We can access to these files inside this folder directly by URL
// app.set("views", path.join(__dirname, "views"));

const loggingMiddleware = (req, res, next) => {
    console.log(`${new Date().toISOString()}: ${req.originalUrl}`);
    next();
};
app.use(loggingMiddleware);

app.get("/", (req, res) => {
    res.send("Home page");
});

app.use("/api", api_router);

app.all("*", (req, res) => {
    res.status(404).send("Page not found!");
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send(err);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Backend server is now running on port 5000");
});
