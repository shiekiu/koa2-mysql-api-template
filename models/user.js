'use strict'
const db = require('../config/mysql.config')
const mySqlServer = db.mySqlServer
const User = mySqlServer.import('../schema/user.js')
class UserModel {
  /**
   * 获取用户信息
   * @param name  用户姓名
   * @returns {Promise.<'id', 'user_name','password','nickname'>}
   */
  static async getUserByName (name) {
    const userInfo = await User.findOne({
      where: { user_name: name, is_delete: 0 },
      attributes: ['id', 'user_name','password','nickname']
    })
    return userInfo
  }
  /**
   * 创建一个用户信息
   * @param user
   * @returns {Promise.<boolean>}
   */
  static async createUser (user) {
    await User.create({ 
      'user_name': user.name, 'password': user.password, 'nickname':user.nickname, 'is_delete': 0
    })
    return true
  }
  /**
   * 获取用户列表
   * @returns {Promise.<'id', 'user_name','password','nickname'>}
   */
  static async getUserList () {
    const userList = await User.findAll({
      where: { is_delete: 0 },
      attributes: ['id', 'user_name','nickname']
    })
    return userList
  }
  /**
   * 获取用户信息
   * @param id  序号
   * @returns {Promise.<'id', 'user_name','password','nickname'>}
   */
  static async getUserById (id) {
    const user = await User.findOne({
      where: { id: id, is_delete: 0 },
      attributes: ['id', 'user_name','nickname']
    })
    return user
  }
  /**
   * 更新用户
   * @param {id,name,password,nickname}
   * @returns {Promise.<boolean>}
   */
  static async updateUser (id,name,password,nickname) {
    await User.update({ 
      'user_name': name, 'password': password, 'nickname': nickname
    },
    { where: { id: id}})
    return true
  }
  /**
   * 删除用户
   * @param id 序号
   * @returns {Promise.<boolean>}
   */
  static async deleteUser (id) {
    await User.destroy({ where: { id: id }})
    return true
  }
}
module.exports = UserModel