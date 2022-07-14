/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-12 11:21:36
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-12 17:07:25
 * @description: 描述信息
 * @author: chenbinfa
 */
// import { request } from "@/utils";
const wsAPI = "ws://localhost:454/ws/";
let timeout = null;

export default connect;

function connect(setEvents) {
	const socket = new WebSocket(wsAPI);
	socket.addEventListener("open", function (event) {
		console.log("socket is open");
		clearInterval(timeout);
	});
	socket.addEventListener("close", function (event) {
		console.log("socket is close");
		timeout = setTimeout(function () {
			try {
				connect(setEvents);
			} catch (e) {
				console.log(e);
			}
		}, 2000);
	});

	socket.addEventListener("message", function (event) {
		// console.log("Message from server", event.data);
		let json = JSON.parse(event.data);
		if (json.msg != "ok") {
			return console.error(json.msg);
		}
		const o = setEvents.find(t => t.name == json.apiName);
		if (!o) {
			// console.log("event not sub ", json.apiName);
			return;
		}
		o.e(json.data);
	});
}
