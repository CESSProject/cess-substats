let webconfig = require("../../webconfig");
global.webconfig = webconfig;
const DalCommon = require("../../dal/dal-common");
let dal = new DalCommon("tb_test");

async function start() {
  try {
    let sql = "select * from tb_test";
    let tmp = await dal.query(sql);
    console.log(tmp);
  } catch (e) {
    console.log(e);
  }
}
start();
