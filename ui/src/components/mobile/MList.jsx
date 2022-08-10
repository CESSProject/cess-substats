/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-26 14:52:51
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-10 17:44:18
 * @description: 描述信息
 * @author: chenbinfa
 */
import React, { useState, useEffect } from "react";
import { Breadcrumb, Col, DatePicker, Input, Row, Select, message, Divider, List, Typography, Avatar } from "antd";
import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import { useNavigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { formatDataSource } from "@/utils";

const CList = ({ className, props }) => {
	const [loading, setLoading] = useState(false);
	const [dataSource, setDataSource] = useState([]);

	const [total, setTotal] = useState(0);
	const [pageindex, setPageindex] = useState(props.pageindex || 1);
	const [pagesize, setPagesize] = useState(props.pagesize);
	const [reload, setReload] = useState(false);

	const [sorter, setSorter] = useState(null);
	const [filter, setFilter] = useState(null);

	const pagination = {
		total,
		current: pageindex,
		pageSize: pagesize,
		showSizeChanger: true,
		showQuickJumper: true,
		onChange: (i, size) => {
			// console.log("i, size", i, size);
			setPageindex(i);
			setPagesize(size);
			setReload(!reload);
		},
		showTotal: total => `Total ${total}`
	};

	//ajax post
	useEffect(async () => {
		const columns = _.cloneDeep(props.table.columns);
		function s(data) {
			formatDataSource(columns, data);
			setDataSource(data);
		}
		if (props.table && props.table.dataSource) {
			const ds = _.cloneDeep(props.table.dataSource);
			return s(ds);
		}
		setLoading(true);
		let params = {};
		if (props.loadList?.params) {
			params = _.cloneDeep(props.loadList.params);
		}
		params.pageindex = pageindex;
		params.pagesize = pagesize;
		if (sorter) {
			params.sorter = [
				{
					column: sorter.column,
					order: sorter.order
				}
			];
		}
		if (filter) {
			params.filter = filter;
			params.filterType = "and";
		}
		let result = await props.loadList?.method(params);
		if (!result || result.msg != "ok") {
			return;
		}
		result.data.forEach((t, i) => {
			if (!t.key) {
				t.key = t.id || i;
			}
		});
		s(result.data);
		setTotal(result.total || result.data.length);
		setLoading(false);
	}, [reload]);

	return (
		<div className={className}>
			<List
				itemLayout="horizontal"
				dataSource={dataSource}
				loading={loading}
				size={props.size}
				pagination={props.hidePager ? false : pagination}
				renderItem={props.table.renderItem}
			/>
		</div>
	);
};

export default React.memo(styled(CList)`
	display: block;
	overflow: hidden;
	.block-list-box {
		position: relative;
		padding: 4px 10px;
		display: block;
		width: 100%;
		line-height: 27px;
		.block {
			clear: both;
		}
		.left-name {
			color: #aaa;
			float: left;
			width: 20%;
			text-align: right;
			padding-right: 10px;
		}
		.right-value {
			label {
				color: green;
			}
		}
	}
`);
