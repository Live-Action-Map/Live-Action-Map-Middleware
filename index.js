// ==== 
require('dotenv').config()
const logger = require("./modules/logger")
const express = require('express');
const app = express()
const port = process.env.SERVER_PORT || 3000
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const package = require("./package.json")
const cron = require('node-cron');


app.options('*', cors())
app.use(express.json());

const db = require("./modules/db")

const apiInfo = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: package.name,
            version: package.version,
        },
    },
    apis: ['./*.js'],
};

const openapiSpecification = swaggerJsdoc(apiInfo);

// === Cache DB responce in ram for less reads ===

let zones = []
let markers = []

async function readDB() {
    zones = await db.read("zones")
    markers = await db.read("tweets")
}


cron.schedule('*/5 0 * * 0', () => {
    readDB()
});

readDB()

// === Experss Endpoints ===

app.get("/", (req, res) => {
    res.status(200).send("App Running")
})

app.get("/api", (req, res) => {
    res.status(200).send(apiInfo.definition)
})

app.get("/api/markers", (req, res) => {
    res.status(200).send(markers)
})

app.get("/api/zones", (req, res) => {
    res.status(200).send(zones)
})



app.listen(port, () => {
    logger.start(process.env.SERVER_IP, process.env.SERVER_PORT)
})