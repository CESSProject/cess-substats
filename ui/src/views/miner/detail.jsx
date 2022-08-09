/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-26 17:49:48
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-08 19:27:16
 * @description: 描述信息
 * @author: chenbinfa
 */
import React, { useRef, useState, useEffect } from "react";
import {
	DatePicker,
	Input,
	InputNumber,
	Menu,
	Modal,
	Button,
	Tooltip,
	Dropdown,
	Descriptions,
	Select,
	Space,
	Table,
	message,
	Tabs,
	Popconfirm,
	Checkbox,
	Card,
	Form,
	Collapse,
	Empty,
	Spin
} from "antd";
import { UserOutlined, DownOutlined, DeleteOutlined, SwapRightOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import _ from "lodash";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import queryDB from "@services/queryDB";
import formatShowType from "@/utils/formatShowType";
import storageAJAX from "@services/storage";
import moment from "moment";
import copy from "copy-to-clipboard";
import { formatterCurrency, formatterCurrencyStr, formatterSize, formatterSizeFromMB } from "@utils/format";
import BreadcrumbBar from "@/components/BreadcrumbBar";

const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Panel } = Collapse;
let runCount = 0;
let dics = [];

function Main({ className }) {
	const { q } = useParams();
	const [loading, setLoading] = useState(false);
	const [id, setId] = useState(q);
	const [detail, setDetail] = useState({});
	const [columnsAccounts, setColumnsAccounts] = useState([]);
	const [columnsBalance, setColumnsBalance] = useState([]);

	if (!q) {
		return message.error("minerID not found");
	} else {
		if (q != id) {
			setId(q);
		}
	}
	useEffect(async () => {
		setLoading(true);
		let result = await storageAJAX({ ac1: "sminer", ac2: "minerItems" });
		console.log("result", result);
		if (result.msg != "ok") {
			setLoading(false);
			return message.error(result.msg);
		}
		let mainer = result.data.find(t => t.key == id);
		if (!mainer) {
			setLoading(false);
			return message.error("miner not found");
		}
		mainer.power = formatterSizeFromMB(mainer.power);
		mainer.totalReward = formatterCurrency(_.toNumber(mainer.rewardInfo.totalReward));

		mainer.totalRewardsCurrentlyAvailableObj = formatterCurrency(_.toNumber(mainer.rewardInfo.totalRewardsCurrentlyAvailable));
		mainer.totaldNotReceiveObj = formatterCurrency(_.toNumber(mainer.rewardInfo.totaldNotReceive));
		mainer.collateralsObj = formatterCurrency(_.toNumber(mainer.collaterals));
		setDetail(mainer);
		// console.log("mainer", mainer);
		setLoading(false);
	}, [id]);
	useEffect(async () => {
		const columns = [
			{
				title: "Miner ID",
				dataIndex: "peerid"
			},
			{
				title: "Account-1",
				dataIndex: "key",
				showType: "copy"
			},
			{
				title: "Account-2",
				dataIndex: "beneficiary",
				showType: "copy"
			},
			{
				title: "Power",
				dataIndex: "power"
			}
		];
		formatShowType.formatArr(columns);
		setColumnsAccounts(columns);
		const columns2 = [
			{
				title: "Total Reward",
				dataIndex: "totalReward",
				showType: "currency"
			},
			{
				title: "Available",
				dataIndex: "totalRewardsCurrentlyAvailableObj",
				showType: "currency"
			},
			{
				title: "Total Not Receive",
				dataIndex: "collateralsObj",
				showType: "currency"
			},
			{
				title: "Collaterals",
				dataIndex: "totalReward",
				showType: "currency"
			}
		];
		formatShowType.formatArr(columns2);
		setColumnsBalance(columns2);
	}, []);
	return (
		<div className={className}>
			<BreadcrumbBar currPageName="Miner detail" />
			<Spin spinning={loading}>
				<Card title="Miner Detail">
					<div className="table-content">
						<Descriptions bordered column={1} title="Accounts" labelStyle={{ width: "20%" }}>
							{columnsAccounts.map((t, index) => {
								return (
									<Descriptions.Item label={t.title} key={t.dataIndex}>
										{t.render ? t.render(detail[t.dataIndex], detail, index) : detail[t.key]}
									</Descriptions.Item>
								);
							})}
						</Descriptions>
					</div>
				</Card>
			</Spin>
			<Spin spinning={loading}>
				<Card title="Miner Detail">
					<div className="table-content">
						<Descriptions bordered column={1} title="Accounts" labelStyle={{ width: "20%" }}>
							{columnsBalance.map((t, index) => {
								return (
									<Descriptions.Item label={t.title} key={t.dataIndex}>
										{t.render ? t.render(detail[t.dataIndex], detail, index) : detail[t.key]}
									</Descriptions.Item>
								);
							})}
						</Descriptions>
					</div>
				</Card>
			</Spin>
		</div>
	);
}

export default styled(Main)`
	display: block;
	overflow: hidden;
	.table-content {
		background-color: #fff;
		.ant-descriptions-header {
			margin-bottom: 0 !important;
			padding: 10px;
		}
	}
	pre {
		background-color: #000;
		color: #fff;
		padding: 20px;
	}
`;
