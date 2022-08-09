/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-07 14:36:09
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-09 11:00:01
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
import miner from "@services/miner";
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
let ignore = false;

const minerColumns = miner.getColumns();

const Home = ({ ...props }) => {
	document.title = "Home-CESS Substats";
	const navigate = useNavigate();
	const [miners, setMiners] = useState([]);
	const [space, setSpace] = useState({
		used: 0,
		idle: 0,
		total: 0
	});
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
		let totalPower = 0;
		result.data.forEach(m => {
			m.power = _.toNumber(m.power);
			m.totalReward = _.toNumber(m.rewardInfo.totalReward);
			totalPower += m.power;
		});
		result.data.forEach(m => {
			m.per = ((m.power * 100) / totalPower).toFixed(1);
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
			method: miner.loadMiners
		},
		table: {
			columns: minerColumns
		}
	};
	useEffect(async () => {
		ignore = false;
		async function run() {
			if (ignore) return;
			let result = await storageAJAX({ ac1: "sminer", ac2: "totalServiceSpace" });
			if (result.msg != "ok") {
				return;
			}
			const used = result.data;
			if (ignore) return;
			result = await storageAJAX({ ac1: "sminer", ac2: "totalIdleSpace" });
			if (result.msg != "ok") {
				return;
			}
			const idle = result.data;
			if (ignore) return;
			setSpace({
				used,
				idle,
				total: used + idle
			});
		}
		setInterval(run, 10000);
		run();
		return () => {
			ignore = true;
		};
	}, []);
	return (
		<div className="containner-in">
			<div className="chart-box block">
				<Card
					title={
						<span>
							<img width={19} src={process.env.PUBLIC_URL + "/img/icon_cess.png"} /> CESS Storage
						</span>
					}
					className="chart-left myRadius">
					<StorageChart space={space} />
				</Card>
				<Card
					className="chart-right myRadius"
					title={
						<span>
							<img width={19} src={process.env.PUBLIC_URL + "/img/icon_cp.png"} /> Network Overview
						</span>
					}>
					<NetworkOverview space={space} miners={miners} />
				</Card>
			</div>
			<div className="list-box block">
				<LatestBlocks />
			</div>
			<div className="miner-list">
				<Card
					title={
						<span>
							<img width={29} src={process.env.PUBLIC_URL + "/img/2.png"} /> Top Miners
						</span>
					}
					className="myRadius"
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
