# 简易版微博



## 基于express+mongodb+nodejs
###  实现功能
    -  注册
    -  登录
    -  注销
    -  session 保存用户信息
    -  注册时检验用户名是否重复
    -  发表说说
    
### 1. Install 安装
#### NPM
``` 
 npm  install   安装依赖
 node app.js    运行
```
#### 3. 目录结构

```
|-- avatar                             // 放置着的头像文件夹
|-- models                             // models层  业务处理层
|-- node_modules                       // 依赖包
|-- public                             // 静态文件（放置css，js）
|-- router                             // controller层  路由控制
|-- views                              // html
|   |-- index.ejs                      // 首页
|   |-- header.ejs                     // 头部导航条
|   |-- login.ejs                      // 登录页面
|   |-- register.ejs                   // 注册页面
|-- package.json                       // 项目及工具的依赖配置文件
|-- app.js                             // 入口文件
|-- README.md                          // 说明
```


在此输入正文




