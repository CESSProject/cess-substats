/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-12 15:39:39
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-29 17:43:02
 * @description: 描述信息
 * @author: chenbinfa
 */
const { ApiPromise, WsProvider, Keyring } = require("@polkadot/api");
const {
  BN,
  BN_ONE,
  BN_THOUSAND,
  BN_TWO,
  bnToBn,
  extractTime,
} = require("@polkadot/util");
let api = null;
let webconfig = require("../../webconfig");
global.webconfig = webconfig;
let util = require("../../util/common");
const Dal = require("../../dal/dal-common");
const dalAccount = new Dal("tb_block_account");
const _ = require("lodash");

async function initAPI() {
  if (api) return true;
  try {
    const ws = ["ws://192.168.14.145:9944", "ws://106.15.44.155:9948"];
    const wsProvider = new WsProvider(ws[1]);
    api = new ApiPromise({ provider: wsProvider });
    await api.isReady;
    return true;
  } catch (e) {
    return false;
  }
}

async function test() {
  let isConnection = await initAPI();
  if (!isConnection) {
    return console.log("Connection failed");
  }
  let d = await api.query.system.account(
    "cXj6Y9PCncW91jszrrnju5GxNDMhHrwdY7tVMi1558b7spzH3"
  );
  console.log(d.toHuman());
  console.log("complete!");
  process.exit();
}
async function main() {
  let isConnection = await initAPI();
  if (!isConnection) {
    return console.log("Connection failed");
  }
  const list = await dalAccount.findAll();
  for (o of list) {
    let d = await api.query.system.account(o.accountId);

    let entity = {
      id: o.id,
      amount: d.data.free.toNumber(),
    };
    console.log(entity);
    const ret = await dalAccount.update(entity);
    console.log(ret);
  }
  console.log("complete!");
  process.exit();
}
test();
// main();
