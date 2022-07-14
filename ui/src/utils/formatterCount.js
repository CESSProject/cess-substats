/*
 * @description: 计算数量缩进
 * @author: Jack Chen @懒人码农
 * @Date: 2022-04-24 12:02:57
 * @LastEditors: Jack Chen
 * @LastEditTime: 2022-04-25 09:56:46
 */

import _ from "lodash";

export function formatterCount(count) {
	if (_.isString(count)) {
		count = _.toNumber(count);
	}
	if (count === 0) return "0 K";
	const k = 1000; // 设定基础货币换算比例
	const currencyStr = ["", "K", "M", "G", "T", "P", "E", "Z", "Y"]; // 容量单位
	let i = 0; // 单位下标和次幂
	for (let l = 0; l < 8; l++) {
		if (count / Math.pow(k, l) < 1) {
			break;
		}
		i = l;
	}
	return `${count / _.round(Math.pow(k, i))} ${currencyStr[i]}`;
}
