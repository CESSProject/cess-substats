/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-07 14:36:09
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-12 19:29:09
 */
import React, { useRef, useState, useEffect } from "react";
import { DatePicker, Input, Menu, Modal, Button, Dropdown, Descriptions, Select, Space, Table, message, Tabs, Popconfirm, Checkbox, Card, Form } from "antd";
import { UserOutlined, DownOutlined, DeleteOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import "./index.less";
import subData from "@services/subdata";
import constantsAJAX from "@services/chain-state/constants";
import storageAJAX from "@services/storage";
import { formatterCurrency, formatterCurrencyStr, formatterSize, formatterSizeFromMB } from "@utils/format";

const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
let lastBlockTime = 0;
const columns = [
	{
		title: "miner ID",
		dataIndex: "peerid",
		key: "peerid"
	},
	{
		title: "address1",
		dataIndex: "key",
		key: "key"
	},
	{
		title: "address2",
		dataIndex: "beneficiary",
		key: "beneficiary"
	},
	{
		title: "total storage",
		dataIndex: "power",
		key: "power"
	},
	{
		title: "mining reward",
		dataIndex: "totalReward",
		key: "totalReward"
	}
];

const ThTable = ({ ...props }) => {
	const navigate = useNavigate();
	const [blockHeight, setBlockHeight] = useState("Connecting...");
	const [latestBlock, setLatestBlock] = useState(null);
	const [avgBlockTime, setAvgBlockTime] = useState("--");
	const [miners, setMiners] = useState(null);
	useEffect(() => {
		let list = [
			{
				name: "blockHeight",
				e: data => {
					setBlockHeight(data);
					lastBlockTime = new Date().valueOf();
				}
			}
		];
		subData(list);
		setInterval(() => {
			let ms = new Date().valueOf() - lastBlockTime;
			ms = (ms / 1000).toFixed(1);
			if (lastBlockTime == 0) {
				ms = "Connecting...";
			} else {
				ms += "s ago";
			}
			setLatestBlock(ms);
		}, 100);
	}, []);
	useEffect(async () => {
		let result = await constantsAJAX("babe", "expectedBlockTime");
		console.log("result", result);
		let t = result.data;
		t = parseInt(t.replace(",", "")) / 1000;
		setAvgBlockTime(t);
	}, []);
	useEffect(async () => {
		let result = await storageAJAX({ ac1: "sminer", ac2: "minerItems" });
		console.log("result", result);
		result.data.sort((t1, t2) => t1.peerid - t2.peerid);
		result.data.forEach(m => {
			m.power = formatterSizeFromMB(m.power);
			m.totalReward = _.toNumber(m.rewardInfo.totalReward);
		});
		setMiners(result.data);
	}, []);

	return (
		<div className="containner">
			<div className="state-line">
				<div className="state-box">
					<span>block height</span>
					<span>{blockHeight}</span>
				</div>
				<div className="state-box">
					<span>latest block</span>
					<span>{latestBlock}</span>
				</div>
				<div className="state-box">
					<span>avg block time</span>
					<span>{avgBlockTime}s</span>
				</div>
				<div className="state-box">
					<span>current era</span>
					<span>2323</span>
				</div>
				<div className="state-box">
					<span>last era reward</span>
					<span>2323</span>
				</div>
			</div>
			<div className="state-line">
				<div className="state-box">
					<span>active miners</span>
					<span>2323</span>
				</div>
				<div className="state-box">
					<span>used storage</span>
					<span>2323</span>
				</div>
				<div className="state-box">
					<span>available storage</span>
					<span>2323</span>
				</div>
				<div className="state-box">
					<span>utilization</span>
					<span>2323</span>
				</div>
			</div>
			<div className="miner-list">
				<Table dataSource={miners} columns={columns} />;
			</div>
		</div>
	);
};

function isEqual(prevProps, nextProps) {
	return _.isEqual(prevProps.data, nextProps.data);
}

export default React.memo(ThTable, isEqual);
