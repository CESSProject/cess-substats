/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-07 14:36:09
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-11 14:46:43
 */
import React, { useRef, useState, useEffect } from "react";
import { DatePicker, Input, Menu, Modal, Button, Dropdown, Tooltip, Descriptions, Select, Space, Table, message, Tabs, Popconfirm, Checkbox, Card, Form } from "antd";
import { UserOutlined, DownOutlined, DeleteOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import "./list.less";
import subData from "@services/subdata";
import constantsAJAX from "@services/chain-state/constants";
import storageAJAX from "@services/storage";
import queryDB from "@services/queryDB";
import moment from "moment";
import { formatterCurrency, formatterCurrencyStr, formatterSize, formatterSizeFromMB } from "@utils/format";
import copy from "copy-to-clipboard";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { ThTable } from "@/components/ThTable";
import { isMobile } from "@utils";
import MList from "@/components/mobile/MList";
const isM = isMobile();

const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const columns = [
	{
		title: "BlockHeight",
		dataIndex: "blockHeight",
		key: "blockHeight",
		width: "10%",
		showType: "link",
		tpl: "/block/{blockHeight}",
		sorter: true
	},
	{
		title: "Hash",
		dataIndex: "hash",
		key: "hash",
		width: "35%",
		textWrap: "word-break",
		ellipsis: true,
		showType: "copy"
	},
	{
		title: "Prent Hash",
		dataIndex: "parentHash",
		key: "parentHash",
		width: "35%",
		textWrap: "word-break",
		ellipsis: true,
		showType: "copy"
	},
	{
		title: "Time",
		dataIndex: "timestamp",
		key: "timestamp",
		width: "20%",
		showType: "datetime",
		sorter: true
	}
];

const Main = ({ ...propsS }) => {
	document.title = "Blocks-CESS Substats";
	let params = useParams();

	const props = {
		border: true,
		size: "middle",
		pagesize: 10,
		loadList: {
			params: {
				tableName: "block_info"
			},
			method: queryDB.list
		},
		titleBar: {
			title: "Blocks"
		},
		table: {
			columns
		}
	};

	return (
		<div className="containner-in">
			<div className="list">
				{isM ? (
					<Card
						title={
							<span>
								<img width={19} src={process.env.PUBLIC_URL + "/img/icon_lian.png"} /> Blocks
							</span>
						}
						className="myRadius">
						<MList props={props} />
					</Card>
				) : (
					<ThTable props={props} />
				)}
			</div>
		</div>
	);
};

function isEqual(prevProps, nextProps) {
	return _.isEqual(prevProps.data, nextProps.data);
}

export default React.memo(Main, isEqual);
