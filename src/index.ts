import express, { Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import connectToDB from './db/connection';
import apiV1 from './routes/v1';

dotenv.config();

const PORT: string = process.env.MONGODB_ADDON_PORT!;
const app: Application = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();
app.use(urlencodedParser);
app.use(jsonParser);
const corsOptions = {
    origin: 'https://josedejesusamaya.github.io/'
}
app.use(cors());

apiV1(app);

connectToDB().then((connected: boolean) => {
    if (connected) {
        app.listen(PORT, () => {
            console.log(`Listen on ${PORT}` );
        });
    } else {
        console.log('Error mongo DB');
    }
});


