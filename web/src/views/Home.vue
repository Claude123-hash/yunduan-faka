<template>
  <div id="app">
    <el-container>
      <el-header style="padding:0; height: auto;">
        <div class="header_1">
          <div class="header_1a">
            <span class="header_2">云端发卡网</span>
            <div class="nav_links">
              <router-link to="/goods"><span class="header_3">商品列表</span></router-link>
              <router-link to="/order_list"><span class="header_3">订单查询</span></router-link>
            </div>
          </div>
        </div>
        <!-- 增加一个宣传横幅（Hero Section）显得功能丰富 -->
        <div class="hero_section">
          <h1>极速发卡，安全无忧</h1>
          <p>24小时全自动发卡平台，您的虚拟商品贴心管家</p>
          <div class="features">
            <span><i class="el-icon-time"></i> 极速发货</span>
            <span><i class="el-icon-shield"></i> 担保交易</span>
            <span><i class="el-icon-service"></i> 售后无忧</span>
          </div>
        </div>
      </el-header>
      <el-main style="padding-top: 40px; background: transparent;">
        <div class="system_announcement">
          <i class="el-icon-message-solid"></i>
          <marquee scrollamount="5"><strong>【系统公告】</strong> 现货秒发，24小时自动发卡。有疑问请联系客服。</marquee>
        </div>
        <div class="mid_mid"><router-view  :key="$route.path"/></div>
      </el-main>
      <el-footer class="footer_style">
        <div style="margin-bottom: 10px;">
          <span>© 2026 云端发卡网 版权所有</span>
        </div>
        <div>
          <a href="http://127.0.0.1:8889/admin/" target="_blank" class="footer_link">管理后台</a>
        </div>
      </el-footer>
    </el-container>
    <!-- 悬浮客服框 -->
    <div class="customer_service_widget">
      <div class="widget_icon">
        <i class="el-icon-service" style="margin-bottom: 5px; font-size: 18px;"></i>
        <div style="font-size: 13px; text-align: center; line-height: 1.2;">联<br>系<br>客<br>服</div>
      </div>
      <div class="widget_content">
        <h4>售后服务</h4>
        <p>QQ：88888888</p>
        <p>微信：12345</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
     data(){
       return{  
         isCustomerServiceOpen: false
       }
     },
     methods:{
       go_home(){
       }
     }
}
</script>
<style>
.el-header{
 margin: 0;
 padding:0;
}
.customer_service_widget {
  position: fixed;
  right: -150px;
  top: 50%;
  transform: translateY(-50%);
  width: 190px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 102, 255, 0.2);
  border-radius: 12px 0 0 12px;
  box-shadow: -4px 0 15px rgba(0, 102, 255, 0.1);
  display: flex;
  align-items: center;
  transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1) 3s;
  z-index: 999;
}
.customer_service_widget:hover {
  right: 0;
  transition-delay: 0s;
}
.widget_icon {
  width: 40px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0066ff;
  color: #fff;
  border-radius: 12px 0 0 12px;
}
.widget_content {
  padding: 15px;
  width: 150px;
}
.widget_content h4 {
  margin: 0 0 8px 0;
  color: #0066ff;
}
.widget_content p {
  margin: 5px 0;
  font-size: 13px;
  color: #475569;
}
.header_1{
  width:100%;
  height: 70px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 20px rgba(0, 102, 255, 0.05);
  display: grid;
  place-items: center center;
  position: sticky;
  top: 0;
  z-index: 100;
}
.header_1a{
  width: 990px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header_2{
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(135deg, #0066ff, #00b3ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 102, 255, 0.2);
}
.nav_links {
  display: flex;
  gap: 30px;
}
.header_3{
  color: #1e293b;
  font-size: 18px;
  font-weight: 600;
  transition: color 0.3s;
}
.header_3:hover {
  color: #0066ff;
}
.hero_section {
  width: 100%;
  padding: 60px 0;
  text-align: center;
  background: linear-gradient(to right, rgba(0,102,255,0.1), rgba(0,179,255,0.1));
  border-bottom: 1px solid rgba(255,255,255,0.4);
}
.hero_section h1 {
  font-size: 42px;
  color: #0f172a;
  margin-bottom: 15px;
}
.hero_section p {
  font-size: 18px;
  color: #475569;
  margin-bottom: 30px;
}
.features {
  display: flex;
  justify-content: center;
  gap: 40px;
  font-size: 16px;
  color: #0066ff;
  font-weight: bold;
}
.system_announcement {
  max-width: 1000px;
  margin: 0 auto 30px auto;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 102, 255, 0.2);
  border-radius: 12px;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  color: #1e293b;
  box-shadow: 0 4px 15px rgba(0, 102, 255, 0.05);
}
.system_announcement i {
  color: #0066ff;
  font-size: 20px;
  margin-right: 15px;
}
.mid_mid{
  display: grid;
  place-items: start center;
  min-height: 50vh;
}
.footer_style {
  background: rgba(255,255,255,0.3);
  backdrop-filter: blur(10px);
  padding: 30px 0 !important;
  text-align: center;
  color: #475569;
  border-top: 1px solid rgba(255,255,255,0.5);
  margin-top: 50px;
  height: auto !important;
}
.footer_link {
  color: #0066ff;
  text-decoration: none;
  font-weight: 500;
}
.footer_link:hover {
  text-decoration: underline;
}
</style>

