import express, { Application } from 'express';
import bodyParser from 'body-parser';

import apiV1 from './routes/v1';

const PORT = 8080;
const app: Application = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();
app.use(urlencodedParser);
app.use(jsonParser);

apiV1(app);

app.listen(PORT, () => {
    console.log('Listen on 8080' );
});
