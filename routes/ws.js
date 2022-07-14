/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-11 19:45:15
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-12 15:02:22
 * @description: 描述信息
 * @author: chenbinfa
 */
async function main(ws, req) {
  let list = global.wsClientList;
  ws.send(
    JSON.stringify({ msg: "ok", apiName: "connectState", data: "success" })
  );
  list.push(ws);
  console.log("client count ", list.length);
  ws.on("close", function close() {
    let i = list.indexOf(ws);
    list.splice(i, 1);
    console.log("disconnected");
    console.log("client count ", list.length);
  });
}

module.exports = main;
