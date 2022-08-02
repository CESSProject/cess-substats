/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-07 14:36:09
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-02 17:45:24
 */
import React, { useRef, useState, useEffect } from "react";
import { DatePicker, Input, Menu, Modal, Button, Dropdown, Tooltip, Descriptions, Select, Space, Table, message, Tabs, Popconfirm, Checkbox, Card, Form } from "antd";
import { UserOutlined, DownOutlined, DeleteOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import subData from "@services/subdata";
import constantsAJAX from "@services/chain-state/constants";
import storageAJAX from "@services/storage";
import queryDB from "@services/queryDB";
import moment from "moment";
import { formatterCurrency, formatterCurrencyStr, formatterSize, formatterSizeFromMB } from "@utils/format";
import copy from "copy-to-clipboard";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { ThTable } from "@/components/ThTable";
import styled from "styled-components";

const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
let ignore = false;

const Main = ({ className, miners }) => {
	const columns = [
		{
			title: "Block",
			dataIndex: "blockHeight",
			width: "15%",
			showType: "link",
			tpl: "/block/{blockHeight}"
		},
		{
			title: "Hash",
			dataIndex: "hash",
			width: "60%",
			textWrap: "word-break",
			ellipsis: true,
			showType: "copy"
		},
		{
			title: "Time",
			dataIndex: "timestamp",
			width: "25%",
			showType: "datetime",
			tpl: "fromNow"
		}
	];

	const props = {
		size: "middle",
		hidePager: true,
		pagesize: 10,
		loadList: {
			autoRefresh: 3000,
			params: {
				tableName: "block_info"
			},
			method: queryDB.list
		},
		table: {
			columns
		}
	};

	useEffect(() => {
		ignore = false;
		let e = {
			id: "home-blockHeight",
			name: "blockHeight",
			e: data => {
				// setBlockHeight(data);
				// TODO
			}
		};
		subData.addEvent(e);
		return () => {
			ignore = true;
			subData.removeEvent(e.id);
		};
	}, []);

	return (
		<div className="containner-in">
			<div className="list">
				<ThTable props={props} />
			</div>
		</div>
	);
};

export default React.memo(styled(Main)`
	display: block;
	overflow: hidden;
`);
