const express = require('express');
const parser = require('body-parser');
const path = require('path');

const app = express();

app.use(parser.urlencoded({ extended: true }))
   .use(parser.json())
   .use(express.static(path.resolve(__dirname, '../static')));

const PORT = 3000;

app.listen(PORT, err => {
    if (err) console.log('Error while starting up server at port ' + PORT);
    else console.log('Successfully started server at port ' + PORT);
});
