var mongoose = require('mongoose');
const formidable = require('formidable');
const db = mongoose.connect('mongodb://127.0.0.1:27017/weibo');
let Schema = mongoose.Schema({
    username: String,
    password: String
});
let Schema2 = mongoose.Schema({
    username: String,
    content: String
});
let Model = mongoose.model("users", Schema);
let Comm = mongoose.model("comments", Schema2);
module.exports.showIndex = (req, res, next) => {
    if (req.session.login == '1') {
        var username = req.session.username;
        var login = true;
    } else {
        var username = '';
        var login = false;
    };
    Comm.find({}).sort({
        '_id': -1
    }).exec((err, data) => {
        console.log(data);
        res.render('index', {
            login: login,
            username: username,
            comments: data

        })
    })
    // console.log(login + username);

};
module.exports.showRegister = (req, res, next) => {
    res.render('register', {
        login: false,
        username: ''
    })
}
module.exports.doRegister = (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        // 注册事件；插入users
        var small = new Model({
            username: fields.username,
            password: fields.password
        });
        //使用实例创建
        small.save(function (err) {
            if (err) {
                console.log('注册失败');
                res.send('no');
            }
            // saved!
            req.session.login = '1';
            req.session.username = fields.username
            res.send('ok')
        })
    })
};

module.exports.checkUser = (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        // fields.username
        // console.log(fields)
        Model.find({
            'username': fields.username
        }, (err, data) => {
            if (err) console.log('not find username');
            // console.log(data);
            if (data[0]) {
                res.send('1'); //用户名重复
            } else {
                res.send('-1')
            }
        });
    });
};

module.exports.showLogin = (req, res, next) => {
    res.render('login', {
        login: false,
        username: ''
    })
};

module.exports.doLogin = (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        // fields.username
        // console.log(fields)
        Model.find({
            'username': fields.username
        }, (err, data) => {
            if (err) console.log('not find username');
            // console.log(data);
            if (data[0]) {
                req.session.login = '1';
                req.session.username = fields.username;
                res.send('1'); // 登录成功
            } else {
                res.send('0') //  登录失败 ，请重新登录
            }
        });
    });
};

module.exports.publish = (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        // fields.username
        // console.log(fields);
        var small = new Comm({
            username: req.session.username,
            content: fields.content
        });
        // console.log(req.session.username + fields.content)
        //使用实例创建
        small.save(function (err) {
            if (err) {
                console.log('发表说说失败');
                res.send('no');
            }
            // saved!
            res.send('ok')
        })

    });

};

// logOut
module.exports.logOut = (req, res, next) => {
    req.session.login = '0';
    req.session.username = '';
    res.render('index', {
        login: false,
        username: ''

    })

}