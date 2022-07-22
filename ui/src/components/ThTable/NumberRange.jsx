/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-22 11:01:42
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-22 11:47:57
 * @description: 描述信息
 * @author: chenbinfa
 */
import styled from "styled-components";
import _ from "lodash";
import React, { useRef, useState, useEffect } from "react";
import { UserOutlined, DownOutlined, DeleteOutlined, SwapRightOutlined } from "@ant-design/icons";
import { DatePicker, Input, InputNumber, Menu, Modal, Button, Dropdown, Descriptions, Select, Space, Table, message, Tabs, Popconfirm, Checkbox, Card, Form } from "antd";

function CellAction({ value = [null, null], onChange }) {
	const [number1, setNumber1] = useState(value[0]);
	const [number2, setNumber2] = useState(value[1]);
	const onNumberChange1 = e => {
		setNum(1, e);
	};
	const onNumberChange2 = e => {
		setNum(2, e);
	};
	const setNum = (n, value) => {
		if (Number.isNaN(value)) {
			return;
		}
		const newNumber = parseInt(value || "0", 10);
		if (n == 1) {
			setNumber1(newNumber);
			onChange?.([newNumber, number2]);
		} else {
			setNumber2(newNumber);
			onChange?.([number1, newNumber]);
		}
	};
	return (
		<>
			<InputNumber value={value[0]} onChange={onNumberChange1} />
			<SwapRightOutlined />
			<InputNumber value={value[1]} onChange={onNumberChange2} />
		</>
	);
}

export default CellAction;
