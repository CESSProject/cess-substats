/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-11 17:31:18
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-25 17:13:18
 */
const { ApiPromise, WsProvider, Keyring } = require("@polkadot/api");
let provider, api, keyring;

module.exports = main;
let waiting = false;
async function main() {
  try {
    waiting = false;
    const config = global.webconfig.wsnode;
    provider = new WsProvider(config.nodeURL);
    api = new ApiPromise({
      provider,
    });
    api.on("connected", () => {
      console.log("connect success ", config.nodeURL);
    });
    api.on("disconnected", () => {
      console.log("ws disconnected", config.nodeURL);
      if (waiting) {
        return;
      }
      waiting = true;
      setTimeout(main, 3000);
    });
    api.on("error", (error) => {
      console.log("error", error.message);
      if (waiting) {
        return;
      }
      waiting = true;
      setTimeout(main, 3000);
    });
    process.on("uncaughtException", function (err) {
      console.error("uncaughtException");
    });

    process.on("unhandledRejection", function (err, promise) {
      console.error("unhandledRejection");
    });

    keyring = new Keyring(config.keyringOption);
    api.o;
    global.dotApi = api;
    global.dotKeyring = keyring;
    return { api, keyring };
  } catch (e) {
    console.log(e);
  }
}
