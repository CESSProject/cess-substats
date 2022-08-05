/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-07 14:36:09
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-05 17:52:59
 */
import React, { useRef, useState, useEffect } from "react";
import { DatePicker, Input, Menu, Modal, Button, Dropdown, Descriptions, Select, Space, Table, message, Tabs, Popconfirm, Checkbox, Card, Form } from "antd";
import { UserOutlined, DownOutlined, DeleteOutlined, GlobalOutlined, ApartmentOutlined, AppstoreAddOutlined, SwapOutlined, DatabaseOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useNavigate, NavLink } from "react-router-dom";
import "./index.less";
import subData from "@services/subdata";
import constantsAJAX from "@services/chain-state/constants";
import storageAJAX from "@services/storage";
import { formatterCurrency, formatterCurrencyStr, formatterSize, formatterSizeFromMB } from "@utils/format";
import { ThTable } from "@/components/ThTable";
import StorageChart from "./components/StorageChart";
import NetworkOverview from "./components/NetworkOverview";
import LatestBlocks from "./components/LatestBlocks";

const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
let lastBlockTime = 0;
const columns = [
	{
		title: "ID",
		dataIndex: "peerid",
		width: "5%",
		showType: "link",
		tpl: "/miner/{key}"
	},
	{
		title: "Address1",
		dataIndex: "key",
		width: "35%",
		textWrap: "word-break",
		ellipsis: true,
		showType: "accountIcon"
	},
	// {
	// 	title: "Address1",
	// 	dataIndex: "key",
	// 	width: "30%",
	// 	textWrap: "word-break",
	// 	ellipsis: true,
	// 	showType: "copy"
	// },
	{
		title: "Address2",
		dataIndex: "beneficiary",
		width: "30%",
		textWrap: "word-break",
		ellipsis: true,
		showType: "copy"
	},
	{
		title: "Power",
		dataIndex: "power",
		width: "15%"
	},
	{
		title: "Mining reward",
		dataIndex: "totalReward",
		width: "20%",
		showType: "currency"
	}
];

const Home = ({ ...props }) => {
	document.title = "Home-CESS Substats";
	const navigate = useNavigate();
	const [miners, setMiners] = useState([]);
	const loadMiners = async () => {
		let result = await storageAJAX({ ac1: "sminer", ac2: "minerItems" });
		console.log("result", result);
		if (result.msg != "ok") {
			return;
		}
		result.data.sort((t1, t2) => t2.power - t1.power);
		result.data.forEach((t, i) => {
			t.peerid = i + 1;
		});
		result.data.forEach(m => {
			m.power = formatterSizeFromMB(m.power);
			m.totalReward = _.toNumber(m.rewardInfo.totalReward);
		});
		setMiners(result.data);
		return result;
	};

	const propsTable = {
		border: true,
		size: "middle",
		pagesize: 10,
		hidePager: true,
		loadList: {
			method: loadMiners
		},
		table: {
			columns
		}
	};

	return (
		<div className="containner-in">
			<div className="chart-box block">
				<Card
					title={
						<span>
							<GlobalOutlined /> CESS Storage
						</span>
					}
					className="chart-left">
					<StorageChart />
				</Card>
				<Card
					className="chart-right"
					title={
						<span>
							<ApartmentOutlined /> Network Overview
						</span>
					}>
					<NetworkOverview miners={miners} />
				</Card>
			</div>
			<div className="list-box block">
				<LatestBlocks />
			</div>
			<div className="miner-list">
				<Card
					title={
						<span>
							<DatabaseOutlined /> Top Miners
						</span>
					}
					bodyStyle={{ padding: 0, margin: 0 }}
					extra={
						<NavLink to="/miner/" className="btn-more">
							ALL
						</NavLink>
					}>
					<ThTable props={propsTable} />
				</Card>
			</div>
		</div>
	);
};

function isEqual(prevProps, nextProps) {
	return _.isEqual(prevProps.data, nextProps.data);
}

export default React.memo(Home, isEqual);
