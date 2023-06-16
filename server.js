const express = require("express");
const mongoose = require("mongoose");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const Router = require("./src/routes");
const options = require("./src/config/swagger");

const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.use(express.json());
app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

mongoose.connect("mongodb://localhost:27017/sit", {
    useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.use(Router);

app.listen(8080, () => {
    console.log("Server is running at port 8080");
});

