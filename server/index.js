const express = require('express');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
//var session = require('cookie-session');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config');

var optionsStore = {
	host: 'us-cdbr-east-04.cleardb.com',
    user: 'b0f68051824e0e',
    password: '302e5f8b',
    database: 'heroku_3f382ff65850d4f',
	database: 'sessions'
};

app.use(cors({
    origin: ['http://localhost:3000','https://origin-test.vercel.app'],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin",
    sameSite: 'none',
    secure: true,
}));

app.use(express.json());
app.set('trust proxy', 1)
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

const db = mysql.createPool(config)
var sessionStore = new MySQLStore(optionsStore, db);

app.use(session({
    store: sessionStore,
    secret: 'test',
    resave: false,
    saveUninitialized: false,
    sameSite: 'none',
    secure: true,
    httpOnly: true,
    cookie: {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
    }
}))

app.post('/api/login', (req,res) => {
    const user = req.body.user;
    const pass = req.body.pass;
    const sql = "SELECT * FROM users WHERE login = '"+user+"' and password = md5('"+pass+"') ";
    db.query(sql, (err, result) => {
        req.session.user = result[0];
        req.session.pruebita = 'hola';
        res.send(req.session.user);
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

app.get('/', (req,res) => {
    res.send('Welcome! '+req.session.pruebita);
})


app.get('/api/logout', (req,res) => {
    if(req.session.user){
        req.session.destroy();
    }
})

app.get('/api/getActionsUser', async (req,res) => {
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

app.listen(process.env.PORT || 3001, () => {
    console.log('corriendo server...')
})