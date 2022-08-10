/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-26 14:52:51
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-10 16:27:24
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

const CBlockList = ({ className, props }) => {
	const [dataSource, setDataSource] = useState([]);
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
		let result = await props.loadList?.method();
		if (!result || result.msg != "ok") {
			return;
		}
		result.data.forEach((t, i) => {
			if (!t.key) {
				t.key = t.id || i;
			}
		});
		s(result.data);
	}, []);

	return (
		<div className={className}>
			<List
				itemLayout="horizontal"
				dataSource={dataSource}
				renderItem={item => (
					<List.Item>
						<div className="block-list-box block">
							<div className="block">
								<span className="left-name">Rank：</span>
								<span className="right-value">
									{item.peerid} <label>&nbsp;&nbsp;({item.power}GiB)</label>
								</span>
							</div>
							<div className="block">
								<span className="left-name">Ratio：</span>
								<span className="right-value">{item.per}</span>
							</div>
							<div className="block">
								<span className="left-name">Acc：</span>
								<span className="right-value">{item.key}</span>
							</div>
						</div>
					</List.Item>
				)}
			/>
		</div>
	);
};

export default React.memo(styled(CBlockList)`
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
