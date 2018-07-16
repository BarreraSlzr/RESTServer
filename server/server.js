require('./config/config.js');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Body-parser
const bodyparse = require('body-parser');
app.use( bodyparse.urlencoded({ extended: false }) );
app.use( bodyparse.json() );

//Routes
app.use( require('./routes/index') );

mongoose.connect(process.env.URLDB, (err, res) => {
    if( err ) throw err;
    console.log('Base de datos online');
});

app.listen(process.env.PORT, () => {
    console.log( 'Escuchando puerto: ', process.env.PORT);
});