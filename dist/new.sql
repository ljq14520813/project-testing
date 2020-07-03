/*
Navicat MySQL Data Transfer

Source Server         : new
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : new

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2020-06-30 20:08:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `table1`
-- ----------------------------
DROP TABLE IF EXISTS `table1`;
CREATE TABLE `table1` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) NOT NULL,
  `psd` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table1
-- ----------------------------
INSERT INTO `table1` VALUES ('1', 'jiaqi', '666');
