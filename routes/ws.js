async function main(ws, req) {
  let list=global.wsClientList;
  ws.send("connect success."); 
  list.push(ws);
  console.log('client count ',list.length);
  ws.on('close', function close() {
    let i=list.indexOf(ws);
    list.splice(i,1);
    console.log('disconnected');
    console.log('client count ',list.length);
  });
}

module.exports = main;
