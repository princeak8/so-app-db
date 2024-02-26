require('reflect-metadata');
const express = require("express");
require('dotenv').config();
import { DataSource } from "typeorm"
const ormConfig = require("./config/ormconfig").default;
var cors = require("cors");
import bodyParser from "body-parser";
import routes from "./routes";

var mqtt = require("mqtt");
const http = require("http");
import { createServer, IncomingMessage, ServerResponse, ClientRequest } from 'http';
const queryString = require("query-string");

import seedPowerStations from "./seeds/powerStations";
import LoadDropController from "./controllers/LoadDropController";
import {Request, Response} from 'express';
// var bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use('/api', routes);

// app.get('/api/users', LoadDropController.save);

// app.post('/api/save_drop', LoadDropController.save);


// const dataSource = new DataSource(ormConfig);

// dataSource.initialize()
// .then(() => {
//   dataSource.synchronize(true); 
//   console.log('Database initialized');
// })
// .catch((err) => console.log("Error initializing database: ", err));
import database from "./database";


app.listen("3003", async () => {
    await startDB();
    // seedPowerStations();
    console.log("Server started on port 3003");
});

async function startDB()
{
    try{
        await database();
    }catch(err:any) {
        console.log('Attempting to start DB again');
        await startDB();
    }
}