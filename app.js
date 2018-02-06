const express = require('express');
const router = require('./router/router.js');
const session = require('express-session');
let app = express();
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.set('view engine', 'ejs');
app.use(express.static('public'));
//////////////////////
app.get('/', router.showIndex);
app.get('/register', router.showRegister); //显示注册页面
app.post('/doRegister', router.doRegister);
app.post('/checkUser', router.checkUser);
app.listen(8080)