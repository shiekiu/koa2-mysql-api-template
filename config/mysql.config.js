'use strict'
const config = {
    host: 'localhost',//主机IP
    database: 'testdb',//数据库
    username: 'root',//用户名
    password: 'admin',//密码
    port: '3306',//端口号
    charset: 'UTF8_GENERAL_CI',//编码
    connectionLimit: 10//最大连接数
};
const Sequelize = require('sequelize')
const mySqlServer = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 30000
    },
    define: {
      timestamps: false
    }
})
module.exports = {
    mySqlServer
}
