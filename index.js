const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const carddecks = require('./routes/collections')

connectDB();

app.use(express.json());
app.use('/api/carddecks', carddecks);



app.get('/', (res, req) => {
    req.send('Hello Fam!');
})
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
