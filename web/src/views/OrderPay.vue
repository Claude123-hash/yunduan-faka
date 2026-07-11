<template>
  <div><h1>订单支付</h1>
  <div class="order_pay_main">
    <div class="order_pay_info">
      <div class="order_pay_info_item x1">订单编号:</div>
      <div class="order_pay_info_value x1">{{order_info._id}}</div>
      <div class="order_pay_info_item x2">商品名称:</div>
      <div class="order_pay_info_value x2">{{order_info.goods_name}}</div>
      <div class="order_pay_info_item x1">商品价格:</div>
      <div class="order_pay_info_value x1">{{order_info.price}}</div>
      <div class="order_pay_info_item x2">商品数量:</div>
      <div class="order_pay_info_value x2">{{order_info.num}}</div>
      <div class="order_pay_info_item x1">商品金额:</div>
      <div class="order_pay_info_value x1">{{order_info.money}}</div>
      <div class="order_pay_info_item x2">联系方式:</div>
      <div class="order_pay_info_value x2">{{order_info.qq_email}}</div>
    </div>
    <div class="order_pay_pay">
      <div style="font-size:35px;color:orange;font-weight: bold;margin-top:20px;">{{order_info.money}} <span style="font-size:18px;">元</span> </div>
      <div style="margin-top:20px">    
        <el-radio v-model="pay_type" label="alipay_web" border>支付宝</el-radio>
        <el-radio v-model="pay_type" label="weixin" border>微信</el-radio>
      </div>
      
      <!-- 展示二维码图片 -->
      <div class="qr_code_wrap">
        <img v-if="pay_type === 'alipay_web'" src="/alipay.jpg" alt="支付宝支付" class="pay_qr_img">
        <img v-if="pay_type === 'weixin'" src="/wxpay.png" alt="微信支付" class="pay_qr_img">
      </div>

      <div style="margin-top:20px;">
        <el-button type="primary" @click="go_next">我已经扫码支付</el-button> 
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
     props: ['id'],
     data(){
       return{
         order_info:{},
         pay_type:'alipay_web'
       }
     },
     created(){this.fetch()},
     methods:{
       async fetch(){
         const d = await this.$http.post('/web/order/api/get_order_info',{id:this.id})
         if(d.data.code === 1){
           this.order_info = d.data.data
         }
       },
       go_next(){
          this.$router.push('/order_pay_good/'+this.order_info._id)
       }
     }
}
</script>

<style>
.order_pay_main{
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 30px;
}
.order_pay_info{
  width: 500px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 102, 255, 0.08);
  display: grid;
  padding:20px;
  align-items: center;
  justify-items: center;
  grid-template-columns: 30% 70%;
  grid-template-rows: repeat(6, 50px);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.8);
}
.order_pay_info_item{
  width: 100%;
  height: 50px;
  display: grid;
  justify-items: center;
  align-items: center;
  font-weight: 600;
  color: #475569;
}
.order_pay_info_value{
  width: 100%;
  height: 50px;
  display: grid;
  justify-items: start;
  align-items: center;
  font-weight: bold;
  color: #0f172a;
}
.order_pay_pay{
  width: 350px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 102, 255, 0.08);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
}
.qr_code_wrap {
  margin-top: 25px;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px dashed #cbd5e1;
  padding: 10px;
}
.pay_qr_img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
}
.x1{
  background-color: rgba(0, 102, 255, 0.05);
}
.x2{
  background-color: transparent;
}
</style>