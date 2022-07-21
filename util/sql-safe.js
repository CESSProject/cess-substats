/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-11 15:11:36
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-21 15:31:03
 * @description: 描述信息
 * @author: chenbinfa
 */
"use strict";
const injArr =
  "'|exec|insert|select|delete|update|*|%|chr|mid|master|truncate|char|declare|;|-|+|=|!=".split(
    "|"
  );

function checkSafe(sqlStr) {
  for (let i = 0; i < injArr.length; i++) {
    if (sqlStr.indexOf(injArr[i]) != -1) {
      if (sqlStr.indexOf("master_") == -1) {
        return false;
      }
    }
  }
  return true;
}
module.exports = {
  checkSafe: checkSafe,
};

// console.log(checkSafe('bandwidth'));
