<div align="center">
  <h1>🚀 云端发卡网 (Cloud-Faka)</h1>
  <p>
    <b>一款现代化、高性能、全自动的数字商品发卡发卡系统</b>
  </p>
  <p>
    <img src="https://img.shields.io/badge/Vue.js-2.x-4FC08D?style=flat-square&logo=vue.js" alt="Vue">
    <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js" alt="Node.js">
    <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb" alt="MongoDB">
    <img src="https://img.shields.io/badge/UI-Element_UI-409EFF?style=flat-square" alt="Element UI">
    <img src="https://img.shields.io/badge/UI-Vant-1989FA?style=flat-square" alt="Vant">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License">
  </p>
</div>

## 📖 项目简介
**云端发卡网** 是一套企业级的数字资产自动化销售与发卡系统。项目采用前后端分离架构，深度针对不同终端场景打造了独立的前端工程（Web端、移动端、管理后台），为用户提供极致流畅的购物体验。

后台深度集成了蓝调玻璃态（Glassmorphism）UI 设计，并拥有完善的支付网关（官方支付宝、微信、乐付等第三方支付）闭环逻辑，包括严格的签名验签机制与异步/同步回调处理，确保交易流水 100% 安全可靠。

---

## ✨ 核心特性 & 简历亮点

*   💻 **三端独立架构 (Multi-Terminal Adaptation)**
    *   **PC Web 端**：基于 Vue 2 + 原生 CSS 构建的大屏极简购物商城。
    *   **Mobile 移动端**：基于 Vue 2 + Vant UI 打造，完美适配微信 H5 与移动浏览器，沉浸式购物体验。
    *   **Admin 管理后台**：基于 Vue 2 + Element UI，采用前卫的蓝调毛玻璃视觉风格，支持商品管理、卡密库存管理、订单追踪与系统配置。
*   💳 **企业级支付网关集成 (Payment Gateway Integration)**
    *   **官方接口**：原生对接支付宝电脑网站支付（FAST_INSTANT_TRADE_PAY）与手机网站支付（QUICK_WAP_WAY）。
    *   **第三方聚合**：原生支持乐付 (LePay) 聚合支付接口，包含完整的 `Store-Sign` MD5 签名生成与验签算法，杜绝订单篡改。
    *   **安全回调**：实现异步通知（Notify URL）与同步跳转（Return URL），结合定时器自动轮询查单，确保在高并发下不漏单、不错发。
*   🛍️ **全自动发卡闭环 (Automated Issuance Pipeline)**
    *   支持无限层级的商品分类、库存阈值预警。
    *   支付成功后系统自动事务级锁定并提取有效卡密，毫秒级交付至用户页面。
*   🛡️ **全栈安全与认证 (Security & Authentication)**
    *   使用 JWT (JSON Web Token) 进行后台接口的无状态鉴权拦截。
    *   所有密码与交易密钥采用加盐 Hash 及双重 Base64/MD5 保护。

---

## 🛠️ 技术栈选型

### 前端生态 (Frontend)
*   **核心框架**：Vue 2.x (SPA 单页面应用)
*   **路由与状态**：Vue Router, Vuex
*   **UI 组件库**：Element UI (Admin), Vant (Mobile)
*   **网络请求**：Axios (封装全局请求拦截器与错误处理)
*   **构建工具**：Vue CLI (Webpack 定制化 Chunk 分包优化)

### 后端生态 (Backend)
*   **运行环境**：Node.js
*   **Web 框架**：Express.js (RESTful API 设计)
*   **数据库**：MongoDB + Mongoose (Schema 数据模型抽象)
*   **支付 SDK**：alipay-sdk (阿里官方 SDK)、md5.js、js-base64

---

## 🚀 本地运行与部署

本项目包含四个独立的模块：`server` (后端), `web` (PC前端), `mobile` (手机前端), `admin` (后台前端)。

### 1. 环境准备
*   Node.js (建议 v14+ 且开启 `--openssl-legacy-provider`)
*   MongoDB 服务

### 2. 后端启动 (Server)
```bash
cd server
npm install
# 启动 MongoDB 后，启动 Node 服务
npm run dev
# 后端服务将运行在 http://localhost:8889
```

### 3. 管理后台启动 (Admin)
```bash
cd admin
npm install
npm run serve
# 访问 http://localhost:8080/admin/
```

### 4. 移动端与 PC 端启动
```bash
cd mobile
npm install
npm run serve

cd web
npm install
npm run serve
```

### 5. 生产环境构建 (Build)
每个前端目录均可执行以下命令进行打包，打包后的静态文件将自动输出到 `server/html` 目录下由 Express 统一托管：
```bash
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm run build
```
