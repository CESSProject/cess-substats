/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-08-05 11:15:38
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-05 11:20:50
 * @description: 描述信息
 * @author: chenbinfa
 */
let webconfig = require("../../webconfig");
global.webconfig = webconfig;
const Dal = require("../../dal/dal-common");
const dalBlock = new Dal("tb_block_info");

async function main() {
  const tables = [
    "tb_block_info",
    "tb_block_transaction",
    "tb_block_event",
    "tb_block_account",
  ];
  for (let tb of tables) {
    console.log("truncating", tb);
    const result = await dalBlock.truncate(tb);
    console.log(result);
    console.log("truncating", tb, "sccuess!");
  }
  console.log("truncate complete!");
  process.exit();
}
main().then(() => {}, console.log);
