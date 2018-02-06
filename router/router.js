var mongoose = require('mongoose');
const formidable = require('formidable');
const db = mongoose.connect('mongodb://127.0.0.1:27017/weibo');
let Schema = mongoose.Schema({
    username: String,
    password: String
});
let Model = mongoose.model("users", Schema);
module.exports.showIndex = (req, res, next) => {
    if (req.session.login == '1') {
        var username = req.session.username;
        var login = true;
    } else {
        var username = 'nonde';
        var login = false;
    }
    res.render('index', {
        login: login,
        username: username
    })
};
module.exports.showRegister = (req, res, next) => {
    res.render('register')
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
}