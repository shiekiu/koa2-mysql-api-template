'use strict'
const bcrypt = require('bcryptjs')
const userModel = require('../models/user')
const tokenUtil = require('../util/tokenUtil')
module.exports = {
    'POST /api/login': async (ctx, next) => {
        const data = ctx.request.body
        const user = await userModel.getUserByName(data.name)
        if (user) { 
            if (bcrypt.compareSync(data.password, user.password)) {
                const token = tokenUtil.generateToken(user)
                ctx.rest({ statuscode: 200,  message: "验证成功", nickname: user.nickname, bean: { token }})
            }
            else {
                ctx.rest({ statuscode: -1, message: "密码错误"})
            }
        } else {
            ctx.rest({ statuscode: -1, message: "用户不存在"})
        }
    },
    'POST /api/createUser': async (ctx, next) => {
        const user = ctx.request.body
        if (user.password && user.name && user.nickname) {
            const existUser = await userModel.getUserByName(user.name)
            if (existUser) {
                ctx.rest({ statuscode: -1, message: "用户名已经存在"})
            }
            else {
                user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync())
                await userModel.createUser(user)
                const token = tokenUtil.generateToken(user)
                ctx.rest({ statuscode: 200, message: "创建成功", nickname :user.nickname, bean: { token }});
            }
        } else {
            ctx.rest({ statuscode: -1, message: "参数错误"})
        }
    },
    'GET /api/userList': async (ctx, next) => {
        const userList = await userModel.getUserList()    
        ctx.rest({ statuscode: 200, message: "成功", data: { userList }})
    },
    'GET /api/user/:id': async (ctx, next) => {
        const user = await userModel.getUserById(ctx.params.id)
        if (user) { 
            ctx.rest({ statuscode: 200, message: "成功", data: { user }});      
        }
        else {
            ctx.rest({ statuscode: -1, message: "用户不存在"})
        }
    },
    'PUT /api/user': async (ctx, next) => {
        const user = ctx.request.body
        if ((user.id && !isNaN(user.id)) && (user.name) && (user.password) && (user.nickname)) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync())
            await userModel.updateUser(user.id,user.name,user.password,user.nickname)
            ctx.rest({ statuscode: 200, message: "更新成功"})
        }
        else {
            ctx.rest({ statuscode: -1, message: "更新失败"})
        }

    },
    'DELETE /api/user/:id': async (ctx, next) => {
        if (ctx.params.id && !isNaN(ctx.params.id)) {
            await userModel.deleteUser(ctx.params.id)
            ctx.rest({ statuscode: 200, message: "删除成功"})
        } else {
            ctx.rest({ statuscode: -1, message: "删除失败"})
        }
    }
}