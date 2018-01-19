require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongojs = require('mongojs');
const db = mongojs(process.env.db_uri, ['registrations']);
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('*', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    let registration = req.body;
    db.registrations.insert(registration, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json(result);
    });
});

app.post('/api/email', (req, res) => {
    let json = {
        email: process.env.email
    }
    res.json(json);
});

app.listen(port, () => {
    console.log(`App is listening at port ${port}: http://localhost:${port}`);
});