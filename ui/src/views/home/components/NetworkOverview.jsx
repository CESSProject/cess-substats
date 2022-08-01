/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-26 14:52:51
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-01 16:37:42
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

	useEffect(() => {
		ignore = false;
		let e = {
			id: "home-blockHeight",
			name: "blockHeight",
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

	useEffect(async () => {
		let result = await constantsAJAX("rrsc", "expectedBlockTime"); // ac1=babe/rrsc
		if (result.msg != "ok") {
			return setAvgBlockTime(result.msg);
		}
		console.log("result", result);
		let t = result.data;
		t = parseInt(t.replace(",", "")) / 1000;
		setAvgBlockTime(t);
	}, []);

	useEffect(async () => {
		setLoading(true);
		let result = await storageAJAX({ ac1: "sminer", ac2: "totalPower" });
		if (result.msg != "ok") {
			setLoading(false);
			return;
		}
		setTotalPower(formatterSizeFromMB(result.data));
	}, []);

	useEffect(async () => {
		setLoading(true);
		let result = await storageAJAX({ ac1: "balances", ac2: "totalIssuance" });
		if (result.msg != "ok") {
			setLoading(false);
			return;
		}
		let balances = parseInt(result.data, 16);
		balances = parseInt(balances / 1000000000000);
		balances = formatterCount(balances);
		setTotalIssuance(balances);
	}, []);

	useEffect(async () => {
		setLoading(true);
		let data = [
			{
				Date: "2010-01",
				scales: 1998
			},
			{
				Date: "2010-02",
				scales: 1850
			},
			{
				Date: "2010-03",
				scales: 1720
			},
			{
				Date: "2010-04",
				scales: 1818
			},
			{
				Date: "2010-05",
				scales: 1920
			},
			{
				Date: "2010-06",
				scales: 1802
			},
			{
				Date: "2010-07",
				scales: 1945
			},
			{
				Date: "2010-08",
				scales: 1856
			},
			{
				Date: "2010-09",
				scales: 2107
			},
			{
				Date: "2010-10",
				scales: 2140
			},
			{
				Date: "2010-11",
				scales: 2311
			},
			{
				Date: "2010-12",
				scales: 1972
			},
			{
				Date: "2011-01",
				scales: 1760
			},
			{
				Date: "2011-02",
				scales: 1824
			},
			{
				Date: "2011-03",
				scales: 1801
			},
			{
				Date: "2011-04",
				scales: 2001
			},
			{
				Date: "2011-05",
				scales: 1640
			},
			{
				Date: "2011-06",
				scales: 1502
			},
			{
				Date: "2011-07",
				scales: 1621
			},
			{
				Date: "2011-08",
				scales: 1480
			},
			{
				Date: "2011-09",
				scales: 1549
			},
			{
				Date: "2011-10",
				scales: 1390
			},
			{
				Date: "2011-11",
				scales: 1325
			},
			{
				Date: "2011-12",
				scales: 1250
			},
			{
				Date: "2012-01",
				scales: 1394
			},
			{
				Date: "2012-02",
				scales: 1406
			},
			{
				Date: "2012-03",
				scales: 1578
			},
			{
				Date: "2012-04",
				scales: 1465
			},
			{
				Date: "2012-05",
				scales: 1689
			}
		];
		const config = {
			height: 175,
			data,
			padding: "auto",
			xField: "Date",
			yField: "scales",
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
					<div className="state-box">
						<span>Total Issuance</span>
						<span>{totalIssuance} TCESS</span>
					</div>
					<div className="state-box">
						<span>Storage Miners</span>
						<span>{miners.length} Nodes</span>
					</div>
				</div>
			</div>
			<div className="right-line-box">
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
				margin-bottom: 4%;
				margin-right: 4%;
				padding: 4% 4%;
				border-radius: 4px;
				border: 1px solid #ddd;
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
				}
			}
		}
	}
	.right-line-box {
		float: right;
		width: 45%;
		border: 1px solid #ddd;
		border-radius: 5px;
		padding: 2%;
	}
`);
