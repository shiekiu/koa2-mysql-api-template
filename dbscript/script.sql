/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : testdb

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-01-20 12:46:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户的id',
  `user_name` char(50) DEFAULT NULL COMMENT '用户的名字',
  `password` char(128) DEFAULT NULL COMMENT '用户的密码',
  `is_delete` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否禁用',
  `nickname` varchar(50) NOT NULL COMMENT '昵称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'shiekiu', '$10$d71.rwfIfCTCfM8crkVCdeENKHNYDtYSPaY3yp7h/AHUs3XH4Ug7i', '0', '系统管理员');
