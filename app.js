const express = require('express');
const router = require('./router/router.js');
let app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
//////////////////////
app.get('/', router.showIndex);
app.get('/register', router.showRegister); //显示注册页面
app.post('/doRegister', router.doRegister);
app.listen(8080)