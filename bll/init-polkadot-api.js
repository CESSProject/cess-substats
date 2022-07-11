/*
 * @Description: 
 * @Autor: fage
 * @Date: 2022-07-11 17:31:18
 * @LastEditors: fage
 * @LastEditTime: 2022-07-11 19:53:52
 */
const { ApiPromise, WsProvider, Keyring } = require("@polkadot/api");

module.exports = () => {
  const config=global.webconfig.wsnode;
  const wsProvider = new WsProvider(config.nodeURL);
  const api = new ApiPromise({ provider: wsProvider });
  const keyring = new Keyring(config.keyringOption);
  global.webconfig.dotApi=api;
  global.webconfig.dotKeyring=keyring;
  return { api, keyring };
};
