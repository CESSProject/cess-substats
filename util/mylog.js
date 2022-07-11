'use strict';
const debug=false;
function log(){
    console.log.apply(console, arguments);
}
function nolog() {}
module.exports=debug?log:nolog;