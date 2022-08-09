/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-07 14:36:09
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-09 17:34:25
 */
import React, { useRef, useState, useEffect, useMemo } from "react";
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
let timeout = null;

const minerColumns = miner.getColumns();

const Home = ({ ...props }) => {
	document.title = "Home-CESS Substats";
	const [miners, setMiners] = useState([]);
	const [space, setSpace] = useState({
		used: 0,
		idle: 0,
		total: 0
	});

	const propsTable = useMemo(async () => {
		return {
			border: true,
			size: "middle",
			pagesize: 10,
			hidePager: true,
			loadList: {
				method: async () => {
					if (ignore) return;
					let result = await miner.loadMiners();
					if (ignore) return;
					if (result.msg == "ok") {
						setMiners(result.data);
					}
					return result;
				}
			},
			table: {
				columns: minerColumns
			}
		};
	}, []);
	useEffect(async () => {
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
		timeout = setInterval(run, 10000);
		await run();
		return () => {
			ignore = true;
			clearInterval(timeout);
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
