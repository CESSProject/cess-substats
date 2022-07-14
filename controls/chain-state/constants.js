/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-11 15:11:35
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-12 18:01:33
 * @description: 描述信息
 * @author: chenbinfa
 */
"use strict";
module.exports = async function (req, res, next) {
  const api = global.dotApi;
  // console.log("req.body", req.body);
  const { ac1, ac2 } = req.body;
  await api.isReady;
  const t = api.consts[ac1][ac2];
  const ret = {
    msg: "ok",
    data: t.toHuman(),
  };
  //   let a = api.consts.babe.expectedBlockTime;
  res.json(ret);
};
