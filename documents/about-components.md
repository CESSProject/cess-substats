# 前端自定义UI组件介绍

自定义UI组件路径为： [/ui/src/components](/ui/src/components)  

## ThTable

数据列表显示组件

### 使用示例：

``` javascript
<ThTable props={props} />
```

### 参数：props是一个JSON格式的对象，如下：

``` javascript
const props = {
		border: true,
		size: "middle",
		pagesize: 5,
		loadList: {
			params: {
				tableName: "block_info"
			},
			method: queryDB.list
		},
		table: {
			columns: [
				{
					title: "blockHeight",
					dataIndex: "blockHeight",
					key: "blockHeight",
					sorter: true
				},
				{
					title: "hash",
					dataIndex: "hash",
					key: "hash",
					width: "15%",
					textWrap: "word-break",
					ellipsis: true
				},
				{
					title: "parentHash",
					dataIndex: "parentHash",
					key: "parentHash",
					width: "15%",
					textWrap: "word-break",
					ellipsis: true
				},
				{
					title: "timestamp",
					dataIndex: "timestamp",
					key: "timestamp",
					sorter: true
				},
			]
		},		
		batchAction: [
			{
				label: "",
				type: "del",
				key: "1"
			},
			{
				label: "AJAX请求",
				type: "ajax",
				key: "2",
				props: {
					type: "default",
					onClick: items => {
						alert("select count:" + items.length);
					}
				}
			}
		]
	};
```

### API

| 参数        | 说明                             |
|-------------|----------------------------------|
| border      | 是否显示边框                     |
| size        | 显示尺寸,包括:large/middle/small |
| pagesize    | 每页显示条数                     |
| loadList    | 加载list的配置                   |
| table       | 表格设置                         |
| batchAction | 批量操作按钮配置                 |


#### loadList
| 参数   | 说明               |
|--------|--------------------|
| params | ajax请求包括的参数 |
| method | ajax请求函数       |


#### table.columns

| 参数      | 说明                    |
|-----------|-------------------------|
| title     | 显示名称                |
| dataIndex | 显示的列                |
| key       | react中forEach需要的key |
| sorter    | 是否可排序              |


## AccountIcon

显示Account的SVG图标

### 使用示例

``` javascript
<AccountIcon
    hash={text}
    onClick={() => {
      copy(text);
      message.success("Copy successful !");
    }}
    title="click copy"
  />
```

### API
| 参数    | 说明           |
|---------|----------------|
| hash    | Account hash   |
| title   | SVG的title提示 |
| onClick | 点击事件       |

## BreadcrumbBar

面包屑组件

### API
| 参数         | 说明           |
|--------------|----------------|
| className    | css class name |
| currPageName | 当前页面名称   |


### 使用示例

``` javascript
<BreadcrumbBar currPageName="Account detail" />
```

## NavBar

左侧导航栏组件

### API
| 参数      | 说明           |
|-----------|----------------|
| className | css class name |


### 使用示例

``` javascript
<NavBar className="page-header" />
```

## SearchBar

搜索框组件

### API
| 参数      | 说明           |
|-----------|----------------|
| className | css class name |


### 使用示例

``` javascript
<SearchBar />
```

## 首页UI组件

位于：[/ui/views/home/components](/ui/views/home/components)

### Blocks

块状数字显示组件

#### API
| 参数      | 说明           |
|-----------|----------------|
| className | css class name |
| miners    | 矿工列表       |


#### 使用示例

``` javascript
<Blocks miners={[]} />
```

### NetworkOverview

储存信息预览组件

#### API
| 参数      | 说明           |
|-----------|----------------|
| className | css class name |
| space     | 空间大小       |


#### 使用示例

``` javascript
const space={
		used: 0,
		idle: 0,
		total: 0
	};
<NetworkOverview space={space} />
```

### StorageChart

图标展示组件

#### API
| 参数      | 说明           |
|-----------|----------------|
| className | css class name |
| space     | 空间大小       |


#### 使用示例

``` javascript
const space={
		used: 0,
		idle: 0,
		total: 0
	};
<StorageChart space={space} />
```