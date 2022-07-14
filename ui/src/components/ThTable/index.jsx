/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-07 14:36:09
 * @LastEditors: fage
 * @LastEditTime: 2022-07-07 17:22:22
 */
import React, { useRef, useState } from "react";
import { DatePicker, Input, Menu, Modal, Button, Dropdown,Descriptions,Select, Space, Table, message, Tabs, Popconfirm,Checkbox, Card, Form } from "antd";
import { UserOutlined, DownOutlined, DeleteOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import "./index.less";

const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const ThTable = ({ ...props }) => {
	const navigate = useNavigate();
	const [modalVisible, setModalVisible] = useState(0);
	const hasBorder = true;

	const dataSource = [
		{
			key: "1",
			name: "胡彦斌",
			age: 32,
			address: "西湖区湖底公园1号"
		},
		{
			key: "2",
			name: "胡彦祖",
			age: 42,
			address: "西湖区湖底公园1号"
		}
	];

	const columns = [
		{
			title: "姓名",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "年龄",
			dataIndex: "age",
			key: "age",
			sorter: (a, b) => a.name.length - b.name.length
		},
		{
			title: "住址",
			dataIndex: "address",
			key: "address"
		},
		{
			title: "操作",
			key: "operation",
			fixed: "right",
			width: 120,
			render: () => (
				<div>
					<a onClick={e => setModalVisible(2)}>详情</a> &nbsp;&nbsp;
					<a onClick={e => setModalVisible(1)}>编辑</a>&nbsp;&nbsp;
					<Dropdown overlay={menu}>
						<a onClick={e => e.preventDefault()}>
							<DownOutlined />
						</a>
					</Dropdown>
				</div>
			)
		}
	];

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

	const pagination = {
		total: 85,
		showSizeChanger: true,
		showQuickJumper: true,
		showTotal: total => `共 ${total} 条记录`
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

	return (
		<div className="containner">
			<div className="filter-box">
				<Form name="horizontal_login" layout="inline">
					<Form.Item name="username" label="状态">
						<Select
							style={{
								width: 120
							}}
							bordered={hasBorder}>
							<Option value="jack">已完成</Option>
							<Option value="lucy">进行中</Option>
							<Option value="Yiminghe">yiminghe</Option>
						</Select>
					</Form.Item>
					<Form.Item name="username" label="状态">
						<Select
							style={{
								width: 120
							}}
							bordered={hasBorder}>
							<Option value="jack">已完成</Option>
							<Option value="lucy">进行中</Option>
							<Option value="Yiminghe">yiminghe</Option>
						</Select>
					</Form.Item>
					<Form.Item name="username" label="状态">
						<Select
							style={{
								width: 120
							}}
							bordered={hasBorder}>
							<Option value="jack">已完成</Option>
							<Option value="lucy">进行中</Option>
							<Option value="Yiminghe">yiminghe</Option>
						</Select>
					</Form.Item>
					<Form.Item name="username" label="状态">
						<Select
							style={{
								width: 120
							}}
							bordered={hasBorder}>
							<Option value="jack">已完成</Option>
							<Option value="lucy">进行中</Option>
							<Option value="Yiminghe">yiminghe</Option>
						</Select>
					</Form.Item>
					<Form.Item name="username" label="状态">
						<Select
							style={{
								width: 120
							}}
							bordered={hasBorder}>
							<Option value="jack">已完成</Option>
							<Option value="lucy">进行中</Option>
							<Option value="Yiminghe">yiminghe</Option>
						</Select>
					</Form.Item>
					<Form.Item label="时间">
						<DatePicker
							showTime
							bordered={hasBorder}
							placeholder="开始时间"
							style={{
								width: 180
							}}
						/>
						至
						<DatePicker
							showTime
							bordered={hasBorder}
							placeholder="结束时间"
							style={{
								width: 180
							}}
						/>
					</Form.Item>

					<Form.Item className="right-btn-box">
						<Button type="default" htmlType="reset">
							重置
						</Button>
						&nbsp;
						<Button type="primary" htmlType="submit">
							查询
						</Button>
					</Form.Item>
				</Form>
			</div>
			<div className="content-box block">
				<div className="table-header block">
					<div className="table-title block">这是标题哦</div>
					<div className="right-btn-box block">
						<Space>
							<Input.Group compact style={{ width: 300 }}>
								<Select
									style={{
										width: "30%"
									}}>
									<Option value="Option1">标题</Option>
									<Option value="Option2">Option2</Option>
								</Select>
								<Input.Search
									allowClear
									style={{
										width: "70%"
									}}
								/>
							</Input.Group>
							<Select
								style={{
									width: 120
								}}
								bordered={hasBorder}>
								<Option value="jack">已完成</Option>
								<Option value="lucy">进行中</Option>
								<Option value="Yiminghe">yiminghe</Option>
							</Select>
							<Button type="default">导出</Button>
							<Button type="primary">+ 添加</Button>
						</Space>
					</div>
				</div>
				<div className="table-box block">
					<Table
						rowSelection={{
							type: "checkbox",
							...rowSelection
						}}
						dataSource={dataSource}
						columns={columns}
						pagination={pagination}
					/>
					<div className="batch-btn-box">
						<Button type="default" danger icon={<DeleteOutlined />}>删除选中</Button>
					</div>
				</div>
			</div>
			<Modal title="创建消息推送" width={"60%"} visible={modalVisible === 1} onOk={handleOk} onCancel={handleCancel}>
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
			<Modal title="查看消息详情" width={"60%"} visible={modalVisible === 2} onOk={handleOk} onCancel={handleCancel}>
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
