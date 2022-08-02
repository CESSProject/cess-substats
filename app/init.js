/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-08-02 10:51:57
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-02 15:43:04
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
let webconfig = require("../webconfig");

async function initAPI() {
  global.webconfig = webconfig;
  if (api) return api;
  try {
    const ws = ["ws://192.168.14.145:9944", "ws://106.15.44.155:9948"];
    const wsProvider = new WsProvider(ws[1]);
    api = new ApiPromise({ provider: wsProvider });
    await api.isReady;
    global.api = api;
    return api;
  } catch (e) {
    console.log(e);
    return null;
  }
}
module.exports = initAPI;
