/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-12 11:21:36
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-20 16:15:15
 * @description: 描述信息
 * @author: chenbinfa
 */
// import { request } from "@/utils";
const wsAPI = "ws://localhost:454/ws/";
let socket = null;
let timeout = null;
const events = [];

export default {
	addEvent,
	removeEvent
};

function connect() {
	if (!socket) {
		socket = new WebSocket(wsAPI);
		socket.addEventListener("open", function (event) {
			console.log("socket is open");
			clearInterval(timeout);
		});
		socket.addEventListener("close", function (event) {
			console.log("socket is close");
			socket = null;
			timeout = setTimeout(function () {
				try {
					console.log("try connect socket");
					connect();
				} catch (e) {
					console.log(e);
				}
			}, 2000);
		});
		socket.addEventListener("message", function (event) {
			// console.log("Message from server", event.data);
			let json = JSON.parse(event.data);
			if (json.msg != "ok") {
				return console.error("json.msg", json.msg);
			}
			const o = events.find(t => t.name == json.apiName);
			if (!o || !o.e) {
				// console.log("event not sub ", json.apiName);
				return;
			}
			try {
				o.e(json.data);
			} catch (e) {
				console.log(e);
			}
		});
	}
}

function addEvent(e) {
	events.push(e);
	connect();
}
function removeEvent(id) {
	const i = events.findIndex(t => t.id == id);
	if (i > -1) {
		events.splice(i, 1);
		console.log("remove event complect ", events.length);
	}
}