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
app.use(express.static('./public'));
app.use("/avatar",express.static("./avatar"));

//////////////////////
app.get('/', router.showIndex);
app.get('/register', router.showRegister); //显示注册页面
app.post('/doRegister', router.doRegister);  //执行注册（）
app.post('/checkUser', router.checkUser);  // 注册时检验username是否重复 （ajax操作）
/////
app.get('/login',router.showLogin);   // 显示登陆页面
app.post('/doLogin',router.doLogin); //    执行登录
////
app.post('/publish',router.publish);  //发表说说
app.get('/logOut',router.logOut);   // 注销
app.listen(8080)