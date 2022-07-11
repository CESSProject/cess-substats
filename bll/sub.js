/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-11 20:07:29
 * @LastEditors: Jack Chen
 * @LastEditTime: 2022-07-11 20:37:01
 * @description: 描述信息
 * @author: Jack Chen @懒人码农
 */
async function main() {
  const api = global.webconfig.dotApi;
  await api.isReady;
  api.query.timestamp.now((now) => {
    // console.log(`now of ${now}`);
    send("timestamp", "ok", now.toString());
  });
  api.rpc.chain.subscribeNewHeads((header) => {
    send("header.number", "ok", header.number.toString());
  });
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
