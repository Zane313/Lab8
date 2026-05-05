const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

const homeRoutes = require('./routes/index.routes');
const bikeRoutes = require('./routes/bike.routes');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bigbike_db'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('✅ Connected to database');
});

global.db = db;

app.set('port', process.env.port || port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use('/', homeRoutes);
app.use('/bike', bikeRoutes);

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
