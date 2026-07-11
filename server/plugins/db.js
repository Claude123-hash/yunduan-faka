module.exports = async (app) => {
    const mongoose = require("mongoose");
    
    // 连接真实的 MongoDB 数据库
    const uri = process.env.DB_URI || 'mongodb://127.0.0.1:27017/ideey-faka';
    console.log("=========================================");
    console.log("尝试连接 MongoDB 数据库...");
    console.log("URI: ", uri);
    console.log("=========================================");

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            auto_reconnect: true,
            poolSize: 10,
            useUnifiedTopology: true
        });
        console.log("MongoDB 连接成功！");
    } catch (err) {
        console.error("MongoDB 连接失败，请确保本地或服务器已安装并启动 MongoDB 服务！", err);
    }

    require('require-all')(__dirname + '/../models');

    // 保留自动生成初始安全账号逻辑
    const AdminUser = mongoose.models.AdminUser || require('../models/AdminUser');
    const adminCount = await AdminUser.countDocuments();
    if (adminCount === 0) {
        await AdminUser.create({
            username: 'xiaoxu',
            password: '1818345',
            email: 'admin@example.com',
            phone_num: '13888888888',
            permission: ['admin']
        });
        console.log('--- 数据库为空，已自动注入初始超级管理员 xiaoxu ---');
    }
};