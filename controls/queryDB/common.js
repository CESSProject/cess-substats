/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-11 15:11:35
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-20 17:38:43
 * @description: 描述信息
 * @author: chenbinfa
 */
"use strict";
const Dal = require("../../dal/dal-common");
const listPage = require("../action-helper/list-page");
const detail = require("../action-helper/detail");
const column = require("../action-helper/column");
const del = require("../action-helper/del");
const create = require("../action-helper/create");
const update = require("../action-helper/update");
const exportHelper = require("../action-helper/export");
const batchUpdate = require("../action-helper/batch-update");
const copy = require("../action-helper/copy");

module.exports = function (req, res, next) {
  let funs = {
    list: list,
    create: create,
    update: update,
    del: del,
    column: column,
    detail: detail,
    batch_update: batchUpdate,
    copy: copy,
    export: exportHelper,
    get_table_names: getTableNames,
    get_colum_names: getColumNames,
  };
  let ret = {
    msg: "ok",
    data: [],
  };
  let tableName = req.body.tableName;
  let dal = new Dal("tb_" + tableName);
  let f = funs[req.body.action];
  if (f) {
    f(ret, dal, req, res);
  } else {
    ret.msg = "action(" + req.body.action + ")未定义";
    res.json(ret);
  }
};

function list(ret, dal, req, res) {
  let fieldStr = " * ";
  let fromStr = dal.tableName + " as a";
  listPage(fieldStr, fromStr, dal, req, res);
}
async function getTableNames(ret, dal, req, res) {
  ret.data = await dal.getTableNames();
  res.json(ret);
}
async function getColumNames(ret, dal, req, res) {
  ret.data = await dal.findColumnName(req.body.column_name);
  res.json(ret);
}
