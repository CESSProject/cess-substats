/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-26 14:52:51
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-05 14:52:20
 * @description: 描述信息
 * @author: chenbinfa
 */
import React, { useState, useEffect } from "react";
import { Button, Col, Spin, DatePicker, Input, Row, Select, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { formatterCurrency, formatterCurrencyStr, formatterSize, formatterSizeFromMB } from "@utils/format";
import subData from "@services/subdata";
import constantsAJAX from "@services/chain-state/constants";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Pie, Line } from "@ant-design/plots";
import storageAJAX from "@services/storage";
import queryDB from "@services/queryDB";
import { formatterCount } from "@utils/formatterCount";
import "@ant-design/flowchart/dist/index.css";
let lastBlockTime = 0;
let ignore = false;

const SearchBar = ({ className, miners }) => {
	const [loading, setLoading] = useState(false);
	const [bgColor, setBgColor] = useState(false);
	const [chartConfig, setChartConfig] = useState();
	const [blockHeight, setBlockHeight] = useState("Connecting...");
	const [totalPower, setTotalPower] = useState(0);
	const [totalIssuance, setTotalIssuance] = useState(0);
	const [avgBlockTime, setAvgBlockTime] = useState("--");
	const [list, setList] = useState([]);

	// sub blockHeight
	useEffect(() => {
		ignore = false;
		let e = {
			id: "home-blockInfo",
			name: "blockInfo",
			e: data => {
				setBlockHeight(data.blockHeight);
				setBgColor("red");
				setTimeout(() => {
					if (ignore) return;
					setBgColor("#fff");
				}, 500);
				lastBlockTime = new Date().valueOf();
			}
		};
		subData.addEvent(e);
		return () => {
			ignore = true;
			subData.removeEvent(e.id);
		};
	}, []);

	// expectedBlockTime
	useEffect(async () => {
		let result = await constantsAJAX("rrsc", "expectedBlockTime"); // ac1=babe/rrsc
		if (result.msg != "ok") {
			result = await constantsAJAX("babe", "expectedBlockTime"); // ac1=babe/rrsc
			if (result.msg != "ok") {
				return setAvgBlockTime(result.msg);
			}
		}
		console.log("result", result);
		let t = result.data;
		t = parseInt(t.replace(",", "")) / 1000;
		setAvgBlockTime(t);
	}, []);

	// sminer.totalIdleSpace
	useEffect(async () => {
		ignore = false;
		async function run() {
			if (ignore) return;
			let result = await storageAJAX({ ac1: "sminer", ac2: "totalIdleSpace" });
			if (result.msg != "ok") {
				return;
			}
			setTotalPower(formatterSizeFromMB(result.data));
		}
		setInterval(run, 10000);
		run();
		return () => {
			ignore = true;
		};
	}, []);

	// balances.totalIssuance
	useEffect(async () => {
		setLoading(true);
		let result = await storageAJAX({ ac1: "balances", ac2: "totalIssuance" });
		if (result.msg != "ok") {
			setLoading(false);
			return;
		}
		let balances = parseInt(result.data, 16);
		balances = formatterCurrencyStr(balances);
		setTotalIssuance(balances);
	}, []);

	// storage_power_trend
	useEffect(async () => {
		setLoading(true);
		const params = {
			tableName: "storage_power_trend",
			pageindex: 1,
			pagesize: 100
		};
		let result = await queryDB.list(params);
		if (result.msg != "ok") {
			setLoading(false);
			return;
		}
		const list = result.data.sort((t1, t2) => t1.id - t2.id);
		list.forEach(t => (t["Storage Power(GiB)"] = parseFloat((t.power / 1073741824).toFixed(2))));
		const config = {
			height: 175,
			data: list,
			padding: "auto",
			xField: "dateStr",
			yField: "Storage Power(GiB)",
			// smooth: true,
			xAxis: {
				// type: 'timeCat',
				tickCount: 5
			}
		};
		setChartConfig(config);
		setLoading(false);
	}, []);

	return (
		<div className={className}>
			<div className="left-state-box">
				<div className="state-line">
					<div className="state-box">
						<span>Latest Block</span>
						<span className="trs" style={{ backgroundColor: bgColor }}>
							#{blockHeight} ({avgBlockTime}s)
						</span>
					</div>
					<div className="state-box">
						<span>Storage Power</span>
						<span>{totalPower}</span>
					</div>
					<div className="state-box" style={{ marginBottom: 0 }}>
						<span>Total Issuance</span>
						<span>{totalIssuance} TCESS</span>
					</div>
					<div className="state-box" style={{ marginBottom: 0 }}>
						<span>Storage Miners</span>
						<span>{miners.length} Nodes</span>
					</div>
				</div>
			</div>
			<div className="right-line-box">
				<div className="right-line-box-title">Storage Power Trends</div>
				<Spin spinning={loading}>{chartConfig ? <Line {...chartConfig} /> : ""}</Spin>
			</div>
		</div>
	);
};

export default React.memo(styled(SearchBar)`
	padding: 0px;
	background-color: #fff;
	.left-state-box {
		width: 54%;
		float: left;
		display: block;
		overflow: hidden;
		.state-line {
			display: block;
			overflow: hidden;
			.state-box {
				float: left;
				width: 46%;
				background-color: #fff;
				margin-bottom: 24px;
				margin-right: 4%;
				padding: 19px 4%;
				border-radius: 4px;
				border: 1px solid #ddd;
				transition: background-color 2s;
				-moz-transition: background-color 2s; /* Firefox 4 */
				-webkit-transition: background-color 2s; /* Safari 和 Chrome */
				-o-transition: background-color 2s; /* Opera */
				.trs {
					background-color: #fff;
					transition: background-color 1s;
					-moz-transition: background-color 1s; /* Firefox 4 */
					-webkit-transition: background-color 1s; /* Safari 和 Chrome */
					-o-transition: background-color 1s; /* Opera */
				}
				span {
					display: block;
					clear: both;
					overflow: hidden;
					font-size: 15px;
					line-height: 30px;
					height: 30px;
				}
			}
			.state-box:hover {
				background-color: #e2f6ff;
			}
		}
	}
	.right-line-box {
		float: right;
		width: 45%;
		border: 1px solid #ddd;
		border-radius: 5px;
		padding: 9px 2%;
		position: relative;
		padding-top: 37px;
		.right-line-box-title {
			position: absolute;
			top: 6px;
			left: 11px;
			overflow: hidden;
			font-size: 15px;
		}
	}
`);
