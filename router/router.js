var mongoose = require('mongoose');
const formidable = require('formidable');
const db = mongoose.connect('mongodb://127.0.0.1:27017/weibo');
let Schema = mongoose.Schema({
    username: String,
    password: String
});
let Model = mongoose.model("users", Schema);
module.exports.showIndex = (req, res, next) => {
    res.render('index')
};
module.exports.showRegister = (req, res, next) => {
    res.render('register')
}
module.exports.doRegister = (req, res, next) => {
    // Model.find({
    //     'username': 'fuqiang'
    // }, (err, data) => {
    //     if (err) console.log('not find username');
    //     console.log(data);
    //     res.send('ssss')
    // });






    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        // fields.username
        console.log(fields)
        Model.find({
            'username': fields.username
        }, (err, data) => {
            if (err) console.log('not find username');
            console.log(data);
            if (data[0]) {
                res.send('1')
            } else {
                res.send('-1')
            }
        });
    });




    //继承一个schema
    //生成一个document
    // let apple = new Model({
    //     username: 'apple',
    //     password: 'apple'
    // });
    //存放数据
    // apple.save((err, apple) => {
    //     if (err) return console.log(err);
    //     //查找数据
    //     Model.find({
    //         name: 'apple'
    //     }, (err, data) => {
    //         console.log(data);
    //     });
    //     res.send('ssss')
    // });
}