/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-26 14:52:51
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-12-28 13:45:34
 * @description: 描述信息
 * @author: chenbinfa
 */
import React, { useState, useEffect } from "react";
import { Button, Col, DatePicker, Table, Tabs, Input, Row, Select, message, Radio, Space, Modal } from "antd";
import { SearchOutlined, RedoOutlined, LoadingOutlined, SyncOutlined } from "@ant-design/icons";
import storageAJAX from "@services/storage";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { Search } = Input;
let ignore = false;

const SearchBar = ({ className }) => {
	const [keyword, setKeyword] = useState();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchType, setSearchType] = useState("All");
	const [priceType, setPriceType] = useState("Purchase");
	const [unit, setUnit] = useState("g");
	const [buySpaceNumber, setBuySpaceNumber] = useState();
	const [buySpaceDay, setBuySpaceDay] = useState();
	const [sumResult, setSumResult] = useState(0);

	const [loading, setLoading] = useState(false);
	const [space, setSpace] = useState({
		used: 0,
		idle: 0,
		total: 0,
		totalGiB: 0
	});
	const navigate = useNavigate();

	async function getStore() {
		if (ignore || loading) return;
		setLoading(true);
		let result = await storageAJAX({ ac1: "sminer", ac2: "totalServiceSpace" });
		if (result.msg != "ok") {
			setLoading(false);
			return;
		}
		const used = result.data;
		if (ignore) {
			setLoading(false);
			return;
		}
		result = await storageAJAX({ ac1: "sminer", ac2: "totalIdleSpace" });
		setLoading(false);
		if (result.msg != "ok") {
			return;
		}
		const idle = result.data;
		if (ignore) return;
		const total = used + idle;
		const totalGiB = total / 1073741824;
		const totalTiB = totalGiB / 1000;
		console.log("totalGiB", totalGiB);
		setSpace({
			used,
			idle,
			total,
			totalGiB,
			totalTiB
		});
	}

	useEffect(() => {
		ignore = false;
		getStore();
		return () => {
			ignore = true;
		};
	}, []);

	useEffect(() => {
		let pathArr = window.location.pathname.split("/");
		if (pathArr.length == 3) {
			let type = pathArr[1];
			let v = pathArr[2];
			if (type == "block") {
				type = "Block";
			} else if (type == "transfer") {
				type = "Transfer";
			} else if (type == "account") {
				type = "Account";
			} else {
				type = "All";
			}
			setSearchType(type);
			setKeyword(v);
		}
	}, []);

	const onSearch = e => {
		if (e.code && e.code == "Enter" && e.target.value) {
			setKeyword(e.target.value);
		}
		let type = getSearchType();
		setSearchType(type);
		let url = "/" + type.toLowerCase() + "/" + keyword;
		navigate(url);
	};
	const getSearchType = () => {
		let type = "Transfer";
		if (keyword.indexOf("cX") == 0) {
			type = "Account";
		} else if (keyword.length < 15 && !isNaN(keyword)) {
			type = "Block";
		}
		return type;
	};
	const onChangeType = value => {
		setSearchType(value);
	};
	const onChangeKeyword = e => {
		setKeyword(e.target.value);
	};

	const getPrice = (store, type) => {
		let v = 1000 + (store * 10000) / space.totalGiB;
		if (type == 2) {
			v = v / store;
		}
		return v.toFixed(2) + "  TCESS";
	};

	const onTabChange = e => {
		setPriceType(e.target.value);
	};

	const onSubmit = () => {
		// const [buySpaceNumber, setBuySpaceNumber] = useState();
		// const [buySpaceDay, setBuySpaceDay] = useState();
		// const [sumResult, setSumResult] = useState(0);
		console.log("buySpaceNumber", buySpaceNumber);
		console.log("buySpaceDay", buySpaceDay);
		console.log("sumResult", sumResult);
		let s = parseInt(buySpaceNumber);
		if (unit == "t") {
			s = s * 1000;
		}
		if (priceType != "Purchase") {
			s = s * parseInt(buySpaceDay);
		}
		setSumResult(s);
	};

	return (
		<div className={className}>
			<Modal
				title="
Storage Pricing Calculator"
				visible={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				footer={null}
				width="800px"
				className="modal-price">
				<div>
					<Radio.Group buttonStyle="solid" size="large" value={priceType} onChange={onTabChange}>
						<Radio.Button value="Purchase">Purchase Space</Radio.Button>
						<Radio.Button value="Upgrade">Upgrade Space Size</Radio.Button>
						<Radio.Button value="Extend">Extend Storage Duration</Radio.Button>
					</Radio.Group>
				</div>

				<div style={{ marginTop: "20px" }}>
					<div className="top-line">
						<Row>
							<Col span={10}>Estimated 30 TCESS / GiB / 30 days</Col>
							<Col span={5}>
								<span>Storage Available Used</span>
							</Col>
							{unit == "g" ? <Col span={4}>{space.totalGiB.toFixed(2)} GiB</Col> : <Col span={4}>{space.totalTiB.toFixed(2)} TiB</Col>}
							<Col span={3}>
								{loading ? (
									<div className="tb-top-btn">
										<LoadingOutlined /> Loading
									</div>
								) : (
									<div className="tb-top-btn" onClick={getStore}>
										<RedoOutlined /> Refresh
									</div>
								)}
							</Col>
							<Col span={2}></Col>
						</Row>
					</div>
					<div style={{ marginTop: "20px" }}>
						<Row>
							<Col span={18}>
								<Input
									onChange={e => setBuySpaceNumber(e.target.value)}
									size="large"
									placeholder={priceType == "Purchase" ? "Storage Space" : priceType == "Upgrade" ? "Upgrade Storage Space Size" : "Your Storage Space"}
								/>
							</Col>
							<Col span={6}>
								<Select
									defaultValue="g"
									size="large"
									onChange={e => setUnit(e)}
									style={{ marginLeft: "10px" }}
									options={[
										{
											value: "g",
											label: "GiB / 30 days"
										},
										{
											value: "t",
											label: "TiB / 30 days"
										}
									]}
								/>
							</Col>
						</Row>
					</div>
					{priceType == "Purchase" ? (
						""
					) : (
						<div style={{ marginTop: "20px" }}>
							<Row>
								<Col span={18}>
									<Input onChange={e => setBuySpaceDay(e.target.value)} size="large" placeholder={priceType == "Upgrade" ? "Available Space Days" : "Extend Storage Days"} />
								</Col>
								<Col span={6}>
									<div style={{ lineHeight: "40px", paddingLeft: "10px" }}>Days</div>
								</Col>
							</Row>
						</div>
					)}
				</div>
				<div className="tb-bottom-txt" style={{ marginTop: "20px", paddingTop: "10px" }}>
					<div style={{ float: "left" }}>
						<span style={{ color: "#222" }}>Total</span>
						<span style={{ fontSize: "30px", padding: "0 10px", fontWeight: "bold", color: "#000" }}>{sumResult}</span>
						<span style={{ color: "#aaa" }}>TCESS</span>
					</div>
					<Button size="large" type="primary" onClick={onSubmit}>
						Calculate
					</Button>
				</div>
			</Modal>
			<div className="big-title block">
				<div className="big-title-txt block">Substats Blockchain Explorer</div>
				<div className="big-title-txt-2 block">Find the block that eats the world.</div>
			</div>
			<Search
				className="search-box"
				placeholder="Block Height/Transaction Hash/Account"
				onSearch={onSearch}
				onPressEnter={onSearch}
				allowClear
				value={keyword}
				bordered={false}
				onChange={onChangeKeyword}
				style={{
					borderRadius: "10px",
					border: "1px solid #ddd",
					backgroundColor: "#fff",
					overflow: "hidden"
				}}
				id="searchInput"
				size="large"
			/>
			<div className="top-price-btn">
				<div className="top-price-btn-left">
					<span className="block">Learn About CESS Storage Pricing</span>
					<label className="block">Estimated {getPrice(1024, 2)} / GiB / Month</label>
				</div>
				<div className="top-price-btn-right">
					<span onClick={() => setIsModalOpen(true)}>Learn more</span>
				</div>
			</div>
		</div>
	);
};

export default React.memo(styled(SearchBar)`
	margin-bottom: 20px;
	.top-price-btn {
		position: absolute;
		top: 0px;
		right: 0px;
		display: flex;
		width: 420px;
		padding: 5px 30px;
		border-radius: 6px;
		background-color: #fff;
		box-shadow: 1px 1px 20px 0px #e9e9e9;
		.top-price-btn-left {
			width: 70%;
			span {
				font-size: 13px;
			}
			label {
				font-size: 12px;
				color: #aaa;
			}
		}
		.top-price-btn-right {
			width: 30%;
			span {
				width: 100%;
				border-radius: 4px;
				background-color: #3187fa;
				color: #fff;
				margin: 5px 0;
				display: block;
				overflow: hidden;
				height: 30px;
				line-height: 30px;
				text-align: center;
				cursor: pointer;
			}
			span:hover {
				background-color: #73abf7;
			}
		}
	}
	@media screen and (max-width: 900px) {
		.top-price-btn {
			position: relative !important;
			width: 100% !important;
			margin: 20px auto 0;
			padding: 5px 10px;
		}
	}
	.search-box {
		max-width: 700px;
	}
	.big-title {
		font-family: "Microsoft YaHei", 微软雅黑;
		.big-title-txt {
			font-size: 20px;
			color: #000;
			font-weight: bold;
		}
		.big-title-txt-2 {
			font-size: 14px;
			color: #aaa;
			margin-bottom: 16px;
		}
	}
	.ant-input-group-addon button {
		border: none !important;
		color: rgb(69 148 255) !important;
	}
`);
