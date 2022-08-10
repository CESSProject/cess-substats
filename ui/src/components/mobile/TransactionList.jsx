/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-26 14:52:51
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-10 15:42:18
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
	const columns = _.cloneDeep(props.table.columns);
	columns.push({
		title: "Hash",
		dataIndex: "hash",
		width: "60%",
		textWrap: "word-break",
		ellipsis: true,
		showType: "copy"
	});
	const dataSource = _.cloneDeep(props.table.dataSource);
	formatDataSource(columns, dataSource);
	return (
		<div className={className}>
			<List
				itemLayout="horizontal"
				dataSource={dataSource}
				renderItem={item => (
					<List.Item>
						<div className="block-list-box block">
							<div className="block">
								<span className="left-name">Method：</span>
								<span className="right-value">{item.method}</span>
							</div>
							<div className="block">
								<span className="left-name">Status：</span>
								<span className="right-value">{item.status}</span>
							</div>
							<div className="block">
								<span className="left-name">Time：</span>
								<span className="right-value">{item.timestamp}</span>
							</div>
							<div className="block">
								<span className="left-name">TXHash：</span>
								<span className="right-value">{item.hash}</span>
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
			/* float: right; */
		}
	}
`);
