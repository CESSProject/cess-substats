/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-11 20:07:29
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-05 14:51:37
 * @description: 描述信息
 * @author: chenbinfa
 */
let chainHelper = require("../util/chain-helper");
async function main() {
  try {
    const api = global.dotApi;
    await api.isReady;
    // api.query.timestamp.now((now) => {
    //   // console.log(`now of ${now}`);
    //   send("timestamp", "ok", now.toString());
    // });
    api.rpc.chain.subscribeNewHeads(async (header) => {
      try {
        const blockHeight = header.number.toNumber();
        console.log("blockHeight", blockHeight);
        const blockInfo = await chainHelper.getBlockInfo(api, blockHeight);
        send("blockInfo", "ok", blockInfo);
      } catch (e2) {
        console.log(e2);
      }
    });
    // api.derive.chain.subscribeNewHeads((header) => {
    // console.log("subscribeNewHeads", header.toHuman());
    // console.log("blockHeight", header.number.toString());
    // let json = header.toHuman();
    // console.log(json.digest.logs);
    // });
  } catch (e) {
    console.log(e);
  }
}
function send(apiName, msg, data) {
  const clientList = global.wsClientList;
  if (clientList.length == 0) return;
  json = JSON.stringify({ apiName, msg, data });
  clientList.forEach((c) => {
    try {
      c.send(json);
      //   console.log(`sended data ${json}`);
    } catch (e) {
      console.log(e);
    }
  });
}

module.exports = main;
