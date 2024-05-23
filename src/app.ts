require('reflect-metadata');
const express = require("express");
require('dotenv').config();
const ormConfig = require("./config/ormconfig").default;
var cors = require("cors");
import bodyParser from "body-parser";
import routes from "./routes";

var mqtt = require("mqtt");
const http = require("http");
import { createServer, IncomingMessage, ServerResponse, ClientRequest } from 'http';
const queryString = require("query-string");
import { wait } from "./helpers";


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
import logger from "./logger";


startApp();

async function startApp(count=0)
{
    try{
        await database();
        app.listen("3004", async () => {
            console.log("Server started on port 3003");
        });

    }catch(err:any) {
        console.log('waiting 10seconds');
        await wait(20000);
        console.log('Attempting to start DB again');
        console.log('count:',count);
        if(count < 10) {
            count++;
            await startApp(count);
        }else{
            logger.error("could not start app due to DB error: ",err);
            console.log("could not start app due to DB error");
        }
    }
}