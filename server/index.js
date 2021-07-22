const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: 'userID',
    secret: 'test',
    resave: true,
    saveUninitialized: true,
    /*
    cookie: {
        expires: 60 * 60 * 24
    }
    */
}))

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'origin_test'
})

app.post('/api/login', (req,res) => {
    const user = req.body.user;
    const pass = req.body.pass;
    const sql = "SELECT * FROM users WHERE login = '"+user+"' and password = md5('"+pass+"') ";
    db.query(sql, (err, result) => {
        req.session.user = result[0];
        res.send(result[0]);
    });
})

app.get('/api/checkLogin', (req,res) => {
    if(req.session.user){
        res.send({isLogged: true, user: req.session.user});
    }
    else{
        res.send({isLogged: false});
    }
})

app.get('/api/logout', (req,res) => {
    req.session.destroy(err => {
        //res.redirect('/');
    });
})

app.get('/api/getActionsUser', (req,res) => {
    const user = req.query.user;
    const sql = "SELECT * FROM actions_users WHERE id_user = '"+user+"' ";
    db.query(sql, (err, result) => res.send(result) );
})

app.post('/api/saveAction', (req,res) => {
    const idUser = req.body.user;
    const symbol = req.body.symbol;
    const name = req.body.name;
    const currency = req.body.currency;
    const sql = "INSERT INTO actions_users (id_user, symbol, name, currency) VALUES('"+idUser+"', '"+symbol+"', '"+name+"', '"+currency+"')";
    db.query(sql, (err, result) => res.send(result) );
})

app.delete('/api/delete/:id', (req,res) => {
    const id = req.params.id;
    const sql = "DELETE FROM actions_users WHERE id = '"+id+"' ";
    db.query(sql, (err, result) => res.send(result) );
})

app.listen(3001, () => {
    console.log('corriendo server en puerto 3001..')
})