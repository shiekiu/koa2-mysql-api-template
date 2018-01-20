"use strict"
const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const jwtKoa = require('koa-jwt')
const secret = require('./config/secret.json')
const controller = require('./middlewares/controller')
const rest = require('./middlewares/rest')

const app = new Koa()
// 解决跨域
app.use(cors())
app.name = 'Koa2Api'
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next()
})
// 了一个解析HTTP请求body的处理函数。如果HTTP请求是JSON数据，我们就可以通过ctx.request.body直接访问解析后的JavaScript对象。
app.use(bodyParser())
//数组中的路径不需要通过jwt验证，除了api/login都要验证token
app.use(jwtKoa({secret: secret.sign}).unless({path: [/^\/api\/login/, /^\/api\/createUser/]}))
app.use(rest.restify())
app.use(controller())
app.listen(3001);
console.log('app started at port 3001...');