/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-07 14:36:09
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-12-28 15:10:11
 */
import React, { useRef, useState, useEffect } from "react";
import { DatePicker, Input, Menu, Modal, Button, Dropdown, Descriptions, Select, Space, Table, message, Tabs, Popconfirm, Checkbox, Card, Form } from "antd";
import { UserOutlined, DownOutlined, DeleteOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useNavigate, NavLink } from "react-router-dom";
import subData from "@services/subdata";
import constantsAJAX from "@services/chain-state/constants";
import storageAJAX from "@services/storage";
import miner from "@services/miner";
import { formatterCurrency, formatterCurrencyStr, formatterSize, formatterSizeFromMB, formatterCurrencyStr2 } from "@utils/format";
import { ThTable } from "@/components/ThTable";
import MList from "@/components/mobile/MList";

const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
let lastBlockTime = 0;
import { isMobile } from "@utils";
const isM = isMobile();
const Home = ({ ...props }) => {
	document.title = "Statistics-CESS Substats";
	const navigate = useNavigate();
	const [items, setItems] = useState([]);

	const propsTable = {
		border: true,
		size: "middle",
		pagesize: 10,
		hidePager: true,
		loadList: {
			params: {
				tableName: "miner_summary",
				sorter: [
					{
						column: "power",
						order: "desc"
					}
				]
			},
			method: miner.loadMiners
		},
		titleBar: {
			title: "Statistics"
		},
		table: {
			dataSource: [
				{
					key: "Polkadot",
					updated: "10 mins ago",
					height: 13436,
					storage: 323423342232,
					hash: "0x120s12d0...LMVEWi3109"
				},
				{
					key: "Moonbeam",
					updated: "10 mins ago",
					height: 13436,
					storage: 323232,
					hash: "0x120s12d0...LMVEWi3109"
				},
				{
					key: "Kusama",
					updated: "10 mins ago",
					height: 13436,
					storage: 323232,
					hash: "0x120s12d0...LMVEWi3109"
				},
				{
					key: "Bifrost",
					updated: "10 mins ago",
					height: 13436,
					storage: 323232,
					hash: "0x120s12d0...LMVEWi3109"
				}
			],
			columns: [
				{
					title: "Chains",
					dataIndex: "key",
					width: "20%",
					render: (text, record, index) => {
						return (
							<span>
								<img src={"/img/" + text + ".svg"} width="30px" /> {text}
							</span>
						);
					}
				},
				{
					title: "Last Updated",
					dataIndex: "updated",
					width: "20%",
					showType: "text"
				},
				{
					title: "Last Block Height",
					dataIndex: "height",
					width: "20%",
					render: (text, record, index) => {
						let coin = Math.round(parseInt(text) * 100) / 100;
						coin = coin.toLocaleString("zh", { style: "decimal" });
						return coin;
					}
				},
				{
					title: "Storage",
					dataIndex: "storage",
					width: "20%",
					render: (text, record, index) => {
						return <span>{formatterSize(text)}</span>;
					}
				},
				{
					title: "File Hash",
					dataIndex: "hash",
					width: "20%",
					showType: "copy"
				}
			]
		}
	};

	return (
		<div className="containner-in">
			<div className="miner-list">
				{isM ? (
					<Card
						title={
							<span>
								<img width={19} src={process.env.PUBLIC_URL + "/img/2.png"} /> Top Miners
							</span>
						}
						className="myRadius">
						<MList props={propsTable} />
					</Card>
				) : (
					<ThTable props={propsTable} />
				)}
			</div>
		</div>
	);
};

function isEqual(prevProps, nextProps) {
	return _.isEqual(prevProps.data, nextProps.data);
}

export default React.memo(Home, isEqual);
