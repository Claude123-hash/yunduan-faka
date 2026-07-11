<template>
<div>
  <el-container>
        <el-header height="35px"  >
          <div class="mid_5">
          <div>
              <span class="title_1">云端发卡网管理后台</span>
          </div>
         <div style="justify-self:end">
        <el-dropdown @command="handleCommand">
          <i  class="el-icon-setting" style="margin-right: 15px;color:#ffffff"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginout">注销 </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        用户名:<span>{{model.username}}</span>
        </div>
        </div>
      </el-header>

    <el-container class="admin-main-bg">
    <el-aside width="210px" class="glass-sidebar">
    
      <el-menu router 
        :default-openeds="['1','2','3','4']" 
        :default-active="$route.path"
        background-color="transparent"
        text-color="#1e3a8a"
        active-text-color="#0284c7"        
        class="glass-menu"
        >
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-s-home"></i>设置相关</template>
           <!--  <el-menu-item index="/overview">系统概况</el-menu-item>
            <el-menu-item index="/set_email">邮箱设置</el-menu-item> -->
            <el-menu-item index="/set_pay">支付设置</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-s-goods"></i>商品管理</template>
            <el-menu-item index="/set_type">分类管理</el-menu-item>
            <el-menu-item index="/set_goods">商品管理</el-menu-item>
            <el-menu-item index="/set_kami">卡密管理</el-menu-item>           
        </el-submenu>
        <el-submenu index="3">
            <template slot="title"><i class="el-icon-s-order"></i>订单管理</template>
            <el-menu-item index="/list_order">订单表列</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

      <el-main>
        <router-view :key="$route.path"></router-view>
        
      </el-main>
    </el-container>
     </el-container>


  </div>
</template>

<script>
//import moment from 'moment'
//background: linear-gradient(to right,lime,15%,green 90%,lime );
export default {
  data() {
    return {
      model:{
        username:'-'
      }
    };
  },
  async created(){
   // console.log(11)
    this.model.username = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).username
  },
  methods :{
      handleCommand(command) {
        if(command==='loginout'){
             localStorage.removeItem('token')
            this.$message({type:"success",message:'注销成功'})
            this.$router.push('/login')
        }
      }
  }
};
</script>

<style>
.el-table{
  font-size: 0.7rem;
}

.el-table .cell{
 
  padding-left: 8px;
  padding-right: 2px;
}
.el-header {
  background: rgba(224, 242, 254, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  color: #1e3a8a;
  line-height: 35px;
  font-size:14px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  z-index: 10;
}
.el-icon-setting {
  color: #1e3a8a !important;
}
.admin-main-bg {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  min-height: calc(100vh - 35px);
}
.glass-sidebar {
  background: rgba(255, 255, 255, 0.4) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-right: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 2px 0 10px rgba(0,0,0,0.02);
}
.glass-menu {
  border-right: none;
}
.el-submenu__title:hover, .el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.5) !important;
}
.el-main {
  padding:10px 10px 10px 10px
}

.el-aside {
  color: #333;
}

.el-table td,.el-table th{
  padding-top: 0.7rem;
  padding-bottom:0.7rem;
}
.mid_5{
  width: 100%;
  display: grid;
  grid-template-columns: 400px 1fr
}
.title_1{
  font-size: 24px;
  font-weight:bold
}
</style>