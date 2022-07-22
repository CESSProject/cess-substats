/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-07 14:36:09
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-22 14:38:32
 */
import React, { useRef, useState, useEffect } from "react";
import { DatePicker, Input, InputNumber, Menu, Modal, Button, Dropdown, Descriptions, Select, Space, Table, message, Tabs, Popconfirm, Checkbox, Card, Form } from "antd";
import { UserOutlined, DownOutlined, DeleteOutlined, SwapRightOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import "./index.less";
import queryDB from "@services/queryDB";
import NumberRange from "./NumberRange";

const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
let runCount = 0;
let dics = [];

const ThTable = ({ props }) => {
	runCount++;
	console.log("runCount", runCount);
	// console.log("props", props);
	const hasBorder = props.border;
	const navigate = useNavigate();
	const [modalVisible, setModalVisible] = useState(0);
	const [dataSource, setDataSource] = useState([]);

	const [total, setTotal] = useState(0);
	const [pageindex, setPageindex] = useState(1);
	const [pagesize, setPagesize] = useState(props.pagesize);
	const [reload, setReload] = useState(false);

	const [sorter, setSorter] = useState(null);
	const [filter, setFilter] = useState(null);

	const [form] = Form.useForm();
	const [form2] = Form.useForm();

	const pagination = {
		total,
		current: pageindex,
		pageSize: pagesize,
		showSizeChanger: true,
		showQuickJumper: true,
		onChange: (i, size) => {
			console.log("i, size", i, size);
			setPageindex(i);
			setPagesize(size);
			setReload(!reload);
		},
		showTotal: total => `Total ${total}`
	};

	//load dics
	useEffect(async () => {
		console.log("load dics");
		let result = await queryDB.dics();
		if (result.msg != "ok") {
			return;
		}
		dics = result.data;
		console.log("dics", dics);
	}, []);

	//ajax post
	useEffect(async () => {
		let params = {};
		if (props.loadList.params) {
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
		let result = await props.loadList.method(params);
		if (result.msg != "ok") {
			return;
		}
		result.data.forEach((t, i) => {
			if (!t.key) {
				t.key = t.id || i;
			}
		});
		setDataSource(result.data);
		setTotal(result.total);
	}, [reload]);

	const onTableChange = (paginationObj, filters, sorter, extra) => {
		// console.log("pagination", pagination);
		// console.log("filters", filters);
		// console.log("sorter", sorter);
		// console.log("extra", extra);
		if (sorter && sorter.order) {
			setSorter({
				column: sorter.columnKey || sorter.field,
				order: sorter.order.replace("end", "")
			});
		} else {
			setSorter(null);
		}
		setReload(!reload);
	};

	const menu = (
		<Menu
			items={[
				{
					label: "1st menu item",
					key: "1",
					icon: <UserOutlined />
				},
				{
					label: "2nd menu item",
					key: "2",
					icon: <UserOutlined />
				},
				{
					label: "3rd menu item",
					key: "3",
					icon: <UserOutlined />
				}
			]}
		/>
	);

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
		},
		getCheckboxProps: record => ({
			disabled: record.name === "Disabled User",
			// Column configuration not to be checked
			name: record.name
		})
	};

	const handleOk = () => {
		setModalVisible(0);
	};

	const handleCancel = () => {
		setModalVisible(0);
	};
	const onFinish = values => {
		console.log("Success:", values);
	};
	const onFinishFailed = errorInfo => {
		console.log("Failed:", errorInfo);
	};

	const renderFilterItem = item => {
		if (!item.arr && item.dicId) {
			const dic = dics.find(d => d.id == item.dicId);
			if (dic && dic.items) {
				item.arr = dic.items;
			}
			if (!item.arr || item.arr.length == 0) {
				return "";
			}
		}
		if (item.type === "select") {
			return (
				<Form.Item label={item.label} name={item.cloumn} key={item.cloumn} initialValue={item.defaultValue || 0}>
					<Select
						style={{
							width: 120
						}}
						bordered={hasBorder}
						{...item.props}>
						<Option value={0}>--All--</Option>
						{item.arr.map((a, i) => (
							<Option key={a.value} value={a.value}>
								{a.label}
							</Option>
						))}
					</Select>
				</Form.Item>
			);
		} else if (item.type === "datetime") {
			return (
				<Form.Item label={item.label} key={item.cloumn} name={item.cloumn} initialValue={item.defaultValue}>
					<RangePicker
						showTime={{
							format: "HH:mm"
						}}
						format="YYYY-MM-DD HH:mm"
						allowEmpty={[true, true]}
						{...item.props}
					/>
				</Form.Item>
			);
		} else if (item.type === "numberRange") {
			return (
				<Form.Item label={item.label} key={item.cloumn} name={item.cloumn} initialValue={item.defaultValue}>
					<NumberRange props={item.props} />
				</Form.Item>
			);
		}
	};
	const onFilterSumbit = values => {
		console.log("values", values);
		const filterBar = [];
		props.filterBar.forEach(t => {
			const k = t.cloumn;
			const v = values[k];
			if (!v) {
				return;
			}
			if (t.type === "select") {
				v = v.trim();
				if (!v) {
					return;
				}
				filterBar.push({
					column: k,
					sign: "=",
					values: [v]
				});
			} else if (t.type === "datetime") {
				if (v[0] && v[1]) {
					filterBar.push({
						column: k,
						sign: "betweenTime",
						values: [v[0].format("YYYY-MM-DD HH:mm:ss"), v[1].format("YYYY-MM-DD HH:mm:ss")]
					});
				} else if (v[0]) {
					filterBar.push({
						column: k,
						sign: ">=",
						values: [v[0].format("YYYY-MM-DD HH:mm:ss")]
					});
				} else if (v[1]) {
					filterBar.push({
						column: k,
						sign: "<=",
						values: [v[1].format("YYYY-MM-DD HH:mm:ss")]
					});
				}
			} else if (t.type === "numberRange") {
				if (v[0] !== null && v[1] !== null && v[1] >= v[0]) {
					filterBar.push({
						column: k,
						sign: "between",
						values: v
					});
				} else if (v[0] !== null) {
					filterBar.push({
						column: k,
						sign: ">=",
						values: [v[0]]
					});
				} else if (v[1] !== null) {
					filterBar.push({
						column: k,
						sign: "<=",
						values: [v[1]]
					});
				}
			}
		});
		setFilter(filterBar);
		setReload(!reload);
	};
	const onFilterReset = () => {
		form.resetFields();
	};
	const renderBtn = (item, i) => {
		if (item.type == "add") {
			return (
				<Button size={props.size} key={i} {...item.props} type="primary">
					{item.label || "+ 添加"}
				</Button>
			);
		} else {
			return (
				<Button size={props.size} key={i} {...item.props}>
					{item.label}
				</Button>
			);
		}
	};

	return (
		<div className="containner">
			{props.filterBar ? (
				<div className="filter-box">
					<Form size={props.size} name="horizontal_filter" form={form} layout="inline" onFinish={onFilterSumbit}>
						{props.filterBar?.map(f => renderFilterItem(f))}
						<Form.Item className="right-btn-box">
							<Button type="default" htmlType="button" onClick={onFilterReset}>
								重置
							</Button>
							&nbsp;
							<Button type="primary" htmlType="submit">
								查询
							</Button>
						</Form.Item>
					</Form>
				</div>
			) : (
				""
			)}
			{props.btnBar && props.btnBar.btns && props.btnBar.btns.length > 0 ? (
				<div className="btns-box">
					<Space style={{ float: props.btnBar?.float }}>{props.btnBar?.btns?.map((f, i) => renderBtn(f, i))}</Space>
				</div>
			) : (
				""
			)}
			<div className="content-box block">
				<div className="table-header block">
					<div className="table-title block">{props.titleBar?.title}</div>
					<div className="right-btn-box block">
						<Space>
							<Form size={props.size} key={"filter-box"} name="horizontal_title_filter" form={form2} layout="inline" onFinish={onFilterSumbit}>
								{props.titleBar?.filter?.map(f => renderFilterItem(f))}
								<Form.Item className="right-btn-box">
									<Button type="primary" htmlType="submit">
										查询
									</Button>
								</Form.Item>
							</Form>
							{props.titleBar?.btns?.map((f, i) => renderBtn(f, i))}
						</Space>
					</div>
				</div>
				<div className="table-box block">
					<Table
						rowSelection={{
							type: "checkbox",
							...rowSelection
						}}
						size={props.size}
						dataSource={dataSource}
						{...props.table}
						pagination={pagination}
						onChange={onTableChange}
					/>
					<div className="batch-btn-box">
						<Button size={props.size} type="default" danger icon={<DeleteOutlined />}>
							删除选中
						</Button>
					</div>
				</div>
			</div>
			<Modal size={props.size} title="创建消息推送" width={"60%"} visible={modalVisible === 1} onOk={handleOk} onCancel={handleCancel}>
				<Form
					name="basic"
					labelCol={{
						span: 4
					}}
					wrapperCol={{
						span: 20
					}}
					initialValues={{
						remember: true
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off">
					<Form.Item
						label="消息类型"
						name="msgType"
						rules={[
							{
								required: true,
								message: "Please input your username!"
							}
						]}>
						<Select>
							<Option value="jack">Jack</Option>
							<Option value="lucy">系统通知</Option>
							<Option value="Yiminghe">yiminghe</Option>
						</Select>
					</Form.Item>

					<Form.Item
						label="消息名称"
						name="msgTitle"
						rules={[
							{
								required: true,
								message: "Please input your password!"
							}
						]}>
						<Input placeholder="消息名称" />
					</Form.Item>
					<Form.Item
						label="短信签名"
						name="msgTitle"
						rules={[
							{
								required: true,
								message: "Please input your password!"
							}
						]}>
						<Input placeholder="消息名称" />
					</Form.Item>

					<Form.Item
						label="模板内容"
						name="msgBody"
						rules={[
							{
								required: true,
								message: "Please input your password!"
							}
						]}>
						<TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
					</Form.Item>
				</Form>
			</Modal>
			<Modal size={props.size} title="查看消息详情" width={"60%"} visible={modalVisible === 2} onOk={handleOk} onCancel={handleCancel}>
				<Descriptions bordered column={1}>
					<Descriptions.Item label="消息类型">系统通知</Descriptions.Item>
					<Descriptions.Item label="消息名称">有新活动！</Descriptions.Item>
					<Descriptions.Item label="模板签名">【源品生物】</Descriptions.Item>
					<Descriptions.Item label="模板内容">商城/某产品分类/真爱宝贝A计划</Descriptions.Item>
				</Descriptions>
			</Modal>
		</div>
	);
};

function isEqual(prevProps, nextProps) {
	return _.isEqual(prevProps.data, nextProps.data);
}

export default React.memo(ThTable, isEqual);
