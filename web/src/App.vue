<template>
  <div id="app">
     <router-view/>
  </div>
</template>

<style>
html {
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #ebf5ff, #d2e6ff);
  background-attachment: fixed;
  min-height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #1e293b;
}

a, .router-link-exact-active, .router-link-active {
   text-decoration: none;
}

/* 覆盖 Element UI 样式实现玻璃拟物化 */
.el-card, .box-card, .el-table, .el-dialog {
  background: rgba(255, 255, 255, 0.65) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
  box-shadow: 0 8px 32px 0 rgba(0, 30, 80, 0.1) !important;
  border-radius: 16px !important;
}

.el-table th, .el-table tr, .el-table td {
  background-color: transparent !important;
}

.el-button--primary {
  background-color: #0066ff !important;
  border-color: #0066ff !important;
  border-radius: 8px !important;
  transition: all 0.3s;
}

.el-button--primary:hover {
  background-color: #0052cc !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3) !important;
}

.el-input__inner, .el-textarea__inner {
  background: rgba(255, 255, 255, 0.8) !important;
  border: 1px solid rgba(0, 102, 255, 0.2) !important;
  border-radius: 8px !important;
  backdrop-filter: blur(4px);
}

.el-input__inner:focus {
  border-color: #0066ff !important;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.15) !important;
  background: #ffffff !important;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
