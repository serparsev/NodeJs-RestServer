require('./config/config')

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuario'))

mongoose.connect(process.env.URLDB, { useNewUrlParser: true },
    (err, res) => {

        if (err) throw err;

        console.log(`Base de datos online`);

    });


app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto: ${process.env.PORT}`);
});