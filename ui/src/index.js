/*
 * @description: 程序入口文件
 * @author: Jack Chen @懒人码农
 * @Date: 2022-04-24 10:01:40
 * @LastEditors: fage
 * @LastEditTime: 2022-07-07 17:15:57
 */

import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import { ConfigProvider } from 'antd';
import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import zhCN from "antd/lib/locale/zh_CN";

ReactDOM.render(
	<ConfigProvider locale={zhCN}>
		<App />
	</ConfigProvider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
