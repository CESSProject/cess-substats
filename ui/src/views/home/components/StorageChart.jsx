/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-26 14:52:51
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-01 12:03:28
 * @description: 描述信息
 * @author: chenbinfa
 */
import React, { useState, useEffect } from "react";
import { Button, Col, Spin, DatePicker, Input, Row, Select, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Pie } from "@ant-design/plots";
import storageAJAX from "@services/storage";
import "@ant-design/flowchart/dist/index.css";

const SearchBar = ({ className }) => {
	const [loading, setLoading] = useState(false);
	const [chartConfig, setChartConfig] = useState();

	useEffect(async () => {
		setLoading(true);
		let result = await storageAJAX({ ac1: "sminer", ac2: "totalSpace" });
		console.log("sminer totalSpace result", result);
		if (result.msg != "ok") {
			setLoading(false);
			return;
		}
		let totalSpace = result.data;
		result = await storageAJAX({ ac1: "sminer", ac2: "totalPower" });
		console.log("sminer totalPower result", result);
		let totalPower = result.data;
		if (result.msg != "ok") {
			setLoading(false);
			return;
		}
		let usePer = ((totalSpace * 100) / totalPower).toFixed(0);
		const config = {
			height: 225,
			data: [
				{
					type: "Use Storage",
					value: totalSpace
				},
				{
					type: "Available Storage",
					value: totalPower
				}
			],
			legend: false,
			angleField: "value",
			colorField: "type",
			radius: 1,
			innerRadius: 0.7,
			label: {
				type: "inner",
				offset: "-50%",
				content: "{value}",
				style: {
					textAlign: "center",
					fontSize: 14
				}
			},
			interactions: [
				{
					type: "element-selected"
				},
				{
					type: "element-active"
				}
			],
			statistic: {
				title: false,
				content: {
					style: {
						whiteSpace: "pre-wrap",
						overflow: "hidden",
						textOverflow: "ellipsis"
					},
					content: usePer + "% Storage Used"
				}
			}
		};
		setChartConfig(config);
		setLoading(false);
	}, []);

	return (
		<div className={className}>
			<Spin spinning={loading}>{chartConfig ? <Pie {...chartConfig} /> : ""}</Spin>
		</div>
	);
};

export default React.memo(styled(SearchBar)`
	padding: 0px;
	background-color: #fff;
`);
