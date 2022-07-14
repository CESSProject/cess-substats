/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-11 17:31:18
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-12 17:02:05
 */
const { ApiPromise, WsProvider, Keyring } = require("@polkadot/api");

module.exports = async () => {
  const config = global.webconfig.wsnode;
  const wsProvider = new WsProvider(config.nodeURL);
  const api = new ApiPromise({ provider: wsProvider });
  const keyring = new Keyring(config.keyringOption);
  global.dotApi = api;
  global.dotKeyring = keyring;
  return { api, keyring };
};
