# About ui

前端UI系统使用了React.js框架和antd UI组件库

## UI系统路径：[/ui](/ui)

## 技术栈如下：

- React
- Ant-design
- Ant-design/charts
- React-router-dom
- Styled-components
- Reduxjs/toolkit
- craco

## 2、项目结构

```
/ui 
├── build/            # 编译后的文件目录
├── public            # 静态文件
├── env               # 开发环境配置
├── env.development   # 开发环境配置
├── env.production    # 生产环境配置
├── env.test          # 测试环境配置
├── src
│   ├── components/   # 公共组件目录
│   ├── redux/        # 状态管理目录
│   ├── services/     # 请求服务目录
│   ├── style/        # 公共样式
│   ├── utils/        # 工具类目录
│   ├── views/        # UI界面目录
│   │   ├── account/  # 账户展示页面
│   │   ├── block/    # 区块相关页面
│   │   ├── home/     # 首页页面
│   │   ├── miner/    # 矿工相关页面
│   │   └── transfer/ # 交易相关页面
│   ├── App.less      # 项目根组件
│   ├── index.js      # 项目根组件
│   ├── index.less    # 项目根组件
│   └── App.js        # 项目包装根组件
├── .gitignore        # git忽略配置
├── .eslintignore     # eslint校验忽略配置
├── .eslintrc.js      # eslint自定义配置
├── .prettierrc.js    # prettierrc自定义配置
└── craco.config.js   # webpack配置
```
## Run guide

### 1.Install the package

```
cd ui
npm install
// or
yarn install
```

### 2.Run

```
npm run start
// or
yarn run start

```

### 3.Build

```
npm run build
// or
yarn run build

```
