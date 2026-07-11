<template>
  <div class="pay-settings-container">
    <div style="margin-bottom: 20px;">
      <h2 style="color: #1e3a8a; margin-top: 0;"><i class="el-icon-wallet"></i> 支付网关配置</h2>
      <el-alert title="请在此配置您的系统收款接口信息。配置完成后请先自行测试支付金额为0.01元的测试商品，确保回调正常后再正式运营。" type="info" show-icon :closable="false"></el-alert>
    </div>

    <el-card shadow="never" class="pay-card">
      <el-tabs v-model="activeName">
          <el-tab-pane name="list">
              <span slot="label"><i class="el-icon-s-operation"></i> 渠道开关</span>
              <div class="tab-content">
                <PayList></PayList>
              </div>
          </el-tab-pane>
          
          <el-tab-pane name="alipay">
              <span slot="label"><i class="el-icon-bank-card"></i> 官方支付宝</span>
              <div class="tab-content">
                  <div class="set_pay_1">
                  <el-form ref="form" :model="pay_info" label-width="150px">
                      <el-form-item label="接口名称">
                          <el-input v-model="pay_info.name" :disabled="true"></el-input>
                      </el-form-item>
                      <el-form-item label="APPID">
                          <el-input v-model="pay_info.APPID" placeholder="请输入支付宝开放平台的应用APPID"></el-input>
                      </el-form-item>
                      <el-form-item label="支付宝公钥">
                          <el-input v-model="pay_info.alipay_pub_key" type="textarea" placeholder="应用对应的支付宝公钥，不是自己生成的公钥。是在上传应用公钥后，支付宝生成的对应公钥。" :rows="4"></el-input>
                      </el-form-item>
                      <el-form-item label="应用私钥">
                          <el-input v-model="pay_info.alipay_private_key" type="textarea" placeholder="请填写您使用工具生成的应用私钥" :rows="4"></el-input>
                      </el-form-item>
                      <el-form-item>
                          <el-button type="primary" icon="el-icon-check" @click="onSmbit">保存支付宝配置</el-button>
                      </el-form-item>
                  </el-form>
                  </div>
              </div>
          </el-tab-pane>
          <el-tab-pane name="lepay">
              <span slot="label"><i class="el-icon-connection"></i> 乐付设置</span>
              <div class="tab-content">
                <LePay></LePay>
              </div>
          </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import LePay from '@/views/pay/LePay.vue'
import PayList from '@/views/pay/PayList.vue'
export default {
    components:{LePay,PayList},
    data(){
        return{
            activeName: 'list',
            pay_info:{
                name:'企业支付宝收款',
            },
            pay_type:'alipay_web',
            test:1
        }
    },
    created(){
        this.fetch()
    },
    methods:{
        async fetch(){
            const d = await this.$http.post('/pay/api/get_pay',{pay_type:'alipay_web'})
            if(d.data.code === 1){
                this.pay_info = d.data.data.pay_info
            }
        },
        async onSmbit(){
            //this.$message({type:'error',message:'测试系统,不支持增加支付方式'});
            if(this.test){

                const d = await this.$http.post('/pay/api/set_pay',{pay_type:this.pay_type,pay_info:this.pay_info})
                if(d.data.code === 1){
                    this.$message({type:'success',message:'支付方式增加成功'})
                    this.fetch()
                }
            }
        },
    }
}
</script>

<style>
.set_pay_1{
    width: 70%;
    margin-top: 20px;
}
.pay-settings-container {
    padding: 10px;
}
.pay-card {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 12px;
}
.tab-content {
    padding: 10px 0;
}
.el-tabs__item {
    font-size: 15px;
}
</style>