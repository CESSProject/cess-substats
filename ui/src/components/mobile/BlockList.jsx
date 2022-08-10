/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-26 14:52:51
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-10 15:37:50
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
								<span className="left-name">Block：</span>
								<span className="right-value">
									{item.blockHeight} <label>({item.timestamp})</label>
								</span>
							</div>
							<div className="block">
								<span className="left-name">Hash：</span>
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
		width: 100%;
		.block {
			clear: both;
		}
		.left-name {
			color: #aaa;
			float: left;
			width: 25%;
			text-align: right;
			padding-right: 10px;
		}
		.right-value label {
			font-size: 13px;
			color: green;
			padding-left: 2px;
		}
	}
`);
