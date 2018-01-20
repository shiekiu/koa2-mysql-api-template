## koa2框架+MySql写个api
### 技术栈 koa2 + mysql + sequelize + jwt
## Build Setup 并在 本地 mysql 服务器 运行 MySql表生成脚本
``` bash
# install dependencies
npm install
# run server at localhost:3001
npm run start
```
## 目录结构
### config 存放 mysql 配置项和生成token用的key
### controllers 
### dbscript mysql 脚本文件
### middlewares中间件
### models 对数据库操作
### schema 执行sequelize-auto -o "./schema" -d testdb -h 127.0.0.1 -u root -p 3306 -x admin -e mysql 自动生成的文件
### util 通用方法