const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const cors = require('cors');
const carddecks = require('./routes/collections')

connectDB();

var corsOptions = {
   origin: 'http://localhost:3000',
   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
 }

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/carddecks', carddecks);



app.get('/', (res, req) => {
    req.send('Hello Fam!');
})
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
