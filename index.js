const express = require('express');
const app = express();


app.get('/', (res, req) => {
    req.send('Hello Fam!');
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
