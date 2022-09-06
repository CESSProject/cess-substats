-- --------------------------------------------------------
-- 主机:                           173.208.220.226
-- 服务器版本:                        5.7.38-log - Source distribution
-- 服务器操作系统:                      Linux
-- HeidiSQL 版本:                  12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- 导出 substats 的数据库结构
CREATE DATABASE IF NOT EXISTS `substats` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `substats`;

-- 导出  表 substats.tb_block_account 结构
CREATE TABLE IF NOT EXISTS `tb_block_account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `accountId` varchar(300) DEFAULT NULL,
  `amount` decimal(65,0) DEFAULT NULL,
  `txCount` bigint(20) DEFAULT NULL,
  `isMiner` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `accountId` (`accountId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8 COMMENT='Transactions';

-- 数据导出被取消选择。

-- 导出  表 substats.tb_block_event 结构
CREATE TABLE IF NOT EXISTS `tb_block_event` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `blockHeight` bigint(20) NOT NULL DEFAULT '0',
  `txId` bigint(20) NOT NULL DEFAULT '0',
  `method` varchar(50) NOT NULL DEFAULT '0',
  `section` varchar(50) NOT NULL DEFAULT '0',
  `data` json NOT NULL,
  `index` int(10) NOT NULL DEFAULT '0',
  `timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3456 DEFAULT CHARSET=utf8 COMMENT='events';

-- 数据导出被取消选择。

-- 导出  表 substats.tb_block_info 结构
CREATE TABLE IF NOT EXISTS `tb_block_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `hash` varchar(300) DEFAULT NULL,
  `signerAccount` varchar(300) DEFAULT NULL,
  `parentHash` varchar(300) DEFAULT NULL,
  `blockHeight` bigint(20) DEFAULT '0',
  `txCount` int(11) DEFAULT NULL,
  `eventCount` int(11) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `number` (`blockHeight`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=616 DEFAULT CHARSET=utf8 COMMENT='区块信息';

-- 数据导出被取消选择。

-- 导出  表 substats.tb_block_transaction 结构
CREATE TABLE IF NOT EXISTS `tb_block_transaction` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `hash` varchar(300) DEFAULT NULL,
  `blockHeight` bigint(20) DEFAULT '0',
  `status` varchar(50) DEFAULT NULL,
  `destAccount` varchar(300) DEFAULT NULL,
  `amount` bigint(20) DEFAULT NULL,
  `isSigned` tinyint(4) NOT NULL DEFAULT '0',
  `method` varchar(50) NOT NULL DEFAULT '0',
  `section` varchar(50) NOT NULL DEFAULT '0',
  `signer` varchar(300) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `hash` (`hash`)
) ENGINE=InnoDB AUTO_INCREMENT=764 DEFAULT CHARSET=utf8 COMMENT='Transactions';

-- 数据导出被取消选择。

-- 导出  表 substats.tb_dictionary 结构
CREATE TABLE IF NOT EXISTS `tb_dictionary` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `category_id` int(11) NOT NULL COMMENT '分类ID',
  `sort_id` decimal(8,2) NOT NULL DEFAULT '0.00' COMMENT '排序ID（升序）',
  `value` int(11) NOT NULL COMMENT '键ID',
  `label` varchar(255) NOT NULL COMMENT '值',
  `about` varchar(255) DEFAULT NULL COMMENT '备注',
  `color` varchar(20) DEFAULT NULL COMMENT '颜色',
  `icon` varchar(200) DEFAULT NULL COMMENT '图标',
  `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '添加时间',
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `index_category_key` (`category_id`,`value`) USING BTREE,
  KEY `index_category_id` (`category_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='数据字典';

-- 数据导出被取消选择。

-- 导出  表 substats.tb_dictionary_category 结构
CREATE TABLE IF NOT EXISTS `tb_dictionary_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(20) NOT NULL COMMENT '分类名称',
  `sort_id` int(11) NOT NULL DEFAULT '0' COMMENT '排序ID，从低到高排序',
  `about` varchar(255) DEFAULT NULL COMMENT '备注',
  `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '添加时间',
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='数据字典目录';

-- 数据导出被取消选择。

-- 导出  表 substats.tb_miner 结构
CREATE TABLE IF NOT EXISTS `tb_miner` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `collateralAccount` varchar(300) DEFAULT NULL,
  `beneficiaryAccount` varchar(300) DEFAULT NULL,
  `collaterals` decimal(65,0) NOT NULL,
  `state` varchar(20) DEFAULT NULL,
  `power` decimal(65,0) NOT NULL,
  `powerPer` decimal(3,1) NOT NULL DEFAULT '0.0',
  `space` decimal(65,0) NOT NULL,
  `totalReward` decimal(65,0) NOT NULL,
  `totalRewardsCurrentlyAvailable` decimal(65,0) NOT NULL,
  `totalNotReceive` decimal(65,5) NOT NULL,
  `addTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `timerStatus` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `collateralAccount` (`collateralAccount`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='矿工列表';

-- 数据导出被取消选择。

-- 导出  表 substats.tb_miner_summary 结构
CREATE TABLE IF NOT EXISTS `tb_miner_summary` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `collateralAccounts` text,
  `collateralAccountCount` int(11) NOT NULL DEFAULT '1',
  `beneficiaryAccount` varchar(300) DEFAULT NULL,
  `collaterals` decimal(65,0) NOT NULL,
  `state` varchar(20) DEFAULT NULL,
  `power` decimal(65,0) NOT NULL,
  `powerPer` decimal(3,1) NOT NULL DEFAULT '0.0',
  `space` decimal(65,0) NOT NULL,
  `totalReward` decimal(65,0) NOT NULL,
  `totalRewardsCurrentlyAvailable` decimal(65,0) NOT NULL,
  `totalNotReceive` decimal(65,5) NOT NULL,
  `addTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `timerStatus` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `beneficiaryAccount` (`beneficiaryAccount`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='矿工收益汇总';

-- 数据导出被取消选择。

-- 导出  表 substats.tb_storage_power_trend 结构
CREATE TABLE IF NOT EXISTS `tb_storage_power_trend` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `power` bigint(20) NOT NULL DEFAULT '0',
  `dateStr` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `dateStr` (`dateStr`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='power';

-- 数据导出被取消选择。

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
