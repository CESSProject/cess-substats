/*
 * @description: 程序入口文件
 * @author: Jack Chen @懒人码农
 * @Date: 2022-04-24 10:01:40
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-08 17:04:04
 */

import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import enGB from "antd/lib/locale/en_GB";

ReactDOM.render(
	<ConfigProvider locale={enGB}>
		<App />
	</ConfigProvider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
