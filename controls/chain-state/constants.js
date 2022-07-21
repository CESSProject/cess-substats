/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-11 15:11:35
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-20 14:06:06
 * @description: 描述信息
 * @author: chenbinfa
 */
"use strict";
module.exports = async function (req, res, next) {
  const api = global.dotApi;
  // console.log("req.body", req.body);
  const { ac1, ac2 } = req.body;
  if (!ac1) {
    return res.json({ msg: "ac1 not found." });
  }
  if (!ac2) {
    return res.json({ msg: "ac2 not found." });
  }
  await api.isReady;
  if (!api.consts[ac1]) {
    return res.json({ msg: "api.consts." + ac1 + " not a function" });
  }
  if (!api.consts[ac1][ac2]) {
    return res.json({
      msg: "api.consts." + ac1 + "." + ac1 + " not a function",
    });
  }
  const t = api.consts[ac1][ac2];
  const ret = {
    msg: "ok",
    data: t.toHuman(),
  };
  //   let a = api.consts.babe.expectedBlockTime;
  res.json(ret);
};
