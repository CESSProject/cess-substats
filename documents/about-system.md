
# About system
 
## 关于

这是一个支持Polkadot链的区块链浏览器系统，包括了后端、前端、数据同步服务 这三个部分。

## 硬件要求

PC:

处理器	     ^Intel Core i3
内存	       ^8GB
主硬盘	     ^80G

## 运行环境

操作系统：window 或 linux
Node:  ^v14.0.1
NPM:   ^v8.4.1
MYSQL: ^v5.6



## 2、项目结构

```
/substats
├── app/              # APPs 链上数据同步服务
│   ├── db-batch/     # 数据库批量处理服务
│   ├── sync-block/   # 同步区块
│   ├── timer/        # 定时服务
│   └── init.js       # Init ApiPromise
├── bll/              # 业务逻辑层
├── controls/         # 控制层
├── dal/              # 数据访问层
├── document/         # 说明文档
├── public/           # 静态文件目录
├── routes/           # 动态路由配置
├── ui/               # 前端UI系统
├── util              # 工具库
├── views             # Node.js模板页面
├── .gitignore        # git忽略配置
├── .babelrc          # babel配置文件
├── app.js            # 项目入口文件
├── jest.config.js    # Jest配置文件
├── LICENSE           # LICENSE
└── webconfig.js      # 系统配置文件
```

## 系统配置说明

```javascript
 {
  sitename: "Substats-CESS Brower", // website name
  wsnode: {
    nodeURL: "wss://devnet-rpc.cess.cloud/ws/",  // rpc node websocket url
    keyringOption: { type: "sr25519", ss58Format: 42 },// keyring type
  },
  host: "substats.cess.cloud",// then website hostname
  port: {
    http: 80,//http listen port
  },
  publicApi: {
    secret: "MA14BAHJ2AEASL", // public api secret
  },
  serverIP: "127.0.0.1",// the server ip string
  mysql: { //mysql config
    connectionLimit: 10, 
    host: "192.168.14.10",// mysql ip
    user: "substats-w3f", // mysql user
    password: "kZtRazdBsxy3d2zs",// login password
    port: 3306,//mysql port
    database: "substats-w3f",//link to database name
  },
  cookie: { //cookie config for express.js
    enable: false,
    secret: "3**&2fMNU",
    expires_day: 2,
  }
}
```