# To-Do
- [x] Textarea
- [x] Image
- [x] Shape
- [x] Table
- [x] 侧边栏
- [ ] 顶部栏
- [x] 预览
- [x] 自适应布局
- [x] textarea自适应
- [ ] undo redo 功能


# 数据协同
* 原理是OT算法, 实践是json0框架
* ArcherAction封装了协作action
* ArcherAction封装了发送action的方法 submit 和 packageSubmit
* 所有涉及action的逻辑，submit action都应该作为代码块的最后一环，submit action后不提供成功回调，因为render是自动触发的，且是异步的，所以无法保证状态。正确做法是submit action之前，就把所有数据设置正确。

# PPT播放
通过reveal.js实现,具体实现在RevealPlayer

# Editor布局原理
* 按照16:10布局，固定width 800px, height 500px
* 根据页面实际大小，借助css的scale属性，把editor等比缩放

# steamer-react
react 高效快速启动脚手架

[![NPM Version](https://img.shields.io/npm/v/steamer-react.svg?style=flat)](https://www.npmjs.com/package/steamer-react)
[![Deps](https://david-dm.org/SteamerTeam/steamer-react.svg)](https://david-dm.org/SteamerTeam/steamer-react)


## 快速启动

* 推荐 >> 使用[steamerjs](https://steamerjs.github.io/docs/projectkits/Bootstrap.html)安装

```javascript

npm i -g steamerjs steamer-plugin-kit

npm i -g steamer-react

steamer kit
```

* 直接从github clone 下来

## 常用命令

```javascript
// 安装依赖
npm i

// 开发
npm start 或 npm run dev
// 打开链接
localhost:9000

// 代码规范安装
npm i -g eslint
npm i -g stylelint

// 代码规范扫描
npm lint

// 生产代码生成
npm run dist 或 npm run pub

```

## 脚手架文档
[参见文档-项目脚手架](https://steamerjs.github.io/docs/projectkits/Starterkit.html)


## 文章参考

* [React移动web极致优化](https://github.com/lcxfs1991/blog/issues/8)
* [webpack使用优化（基本篇）](https://github.com/lcxfs1991/blog/issues/2)
* [webpack使用优化（react篇）](https://github.com/lcxfs1991/blog/issues/7)
* [webpack Performance: The Comprehensive Guide](https://github.com/lcxfs1991/blog/issues/15)
