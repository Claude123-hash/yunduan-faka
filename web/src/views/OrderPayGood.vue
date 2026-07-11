<template>
  <div><h1>{{pay_text}}</h1>
  <div class="kami_info_main">
    <div class="order_pay_good">
        <div class="order_pay_good_h b1">订单编号</div>
        <div class="order_pay_good_i b1">{{order_info._id}}</div>
        <div class="order_pay_good_h b2">商品名称</div>
        <div class="order_pay_good_i b2">{{order_info.goods_name}}</div>
        <div class="order_pay_good_h b1">购买数量</div>
        <div class="order_pay_good_i b1">{{order_info.num}}</div>
        <div class="order_pay_good_h b2">商品价格</div>
        <div class="order_pay_good_i b2">{{order_info.price}}</div>
        <div class="order_pay_good_h b1">订单金额</div>
        <div class="order_pay_good_i b1">{{order_info.money}}</div>
        <div class="order_pay_good_h b2">订单状态</div>
        <div class="order_pay_good_i b2">
                    <el-tag v-if="order_info.status===1" type="warning" size="mini">未支付</el-tag>
                    <el-tag v-if="order_info.status===2" type="success" size="mini">交易成功</el-tag>
                    <el-tag v-if="order_info.status===3" type="success" size="mini">已发货</el-tag>
                    <el-tag v-if="order_info.status===4" type="danger" size="mini">无库存-请联系客服</el-tag>
        </div>
        <div class="order_pay_good_h b1">支付时间</div>
        <div class="order_pay_good_i b1">{{order_info.pay_time}}</div>
        <div class="order_pay_good_h b2">下单手机号</div>
        <div class="order_pay_good_i b2">{{order_info.qq_email}}</div>
    </div>
    <div class="kami_info"  v-if="pay_good===true">
        <div v-if="pay_bad_status===0">
                    <div><h3>提卡信息 (提取成功)</h3></div>
        <div style="padding:0 15px 0 15px;"><el-input v-model="order_info.kami" :disabled="true" size="large"></el-input> </div>
        <div style="margin-top:15px;"> <el-button type="success" @click="copy_kami">点击复制卡密</el-button> </div>
        <div style="margin-top:15px;font-size:12.8px;">使用说明<br>{{order_info.goods_id.Instructions?order_info.goods_id.Instructions:''}}
        </div>
        </div>
        <div v-if="pay_bad_status===4">
                    <div style="padding:0 15px 0 15px;">
                        支付成功,但卡密无库存,请联系客服微信:12345
                    </div>
        </div>
    </div>
        <div class="kami_info" v-else-if="pay_good===false">
            <div class="pay_bad">
                <div class="pay_bad_new" v-if="pay_bad_status===3 || pay_bad_status===1">
                     <i class="el-icon-shopping-cart-2" style="font-size:70px;color:#0066ff"></i>
                     <div style="margin-top:20px; font-size: 18px; font-weight: bold;">您的订单已生成，等待支付</div>
                     <div style="margin-top:30px; display: flex; flex-direction: column; gap: 15px; align-items: center;">
                        <el-button type="primary" size="large" @click="mock_pay" style="width: 250px; font-size: 16px;">模拟付款 (自动出卡)</el-button> 
                        <span style="color: #64748b; font-size: 13px;">点击上方按钮即可体验完整购买闭环</span>
                     </div>
                </div>
                <div class="pay_bad_not" v-else-if="pay_bad_status===2">
                    <i class="el-icon-error" style="font-size:70px;color:red"></i>
                    <div>支付链接已经超时,不要再支付</div>
                    <div>如需卡密,请重新下单</div>
                </div>
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
             order_info:{pay_good_info:{}},
             pay_good:false,
             pay_text:'等待支付',
             pay_bad_status:3,
             pay_bad_end_time:0,
         }
     },
     created(){this.fetch()},
     methods:{
         async fetch(){
             const d = await this.$http.post('/web/order/api/get_order_info',{id:this.id})
             this.order_info = d.data.data
             if(this.order_info.status===2||this.order_info.status===3){
                 this.pay_good = true
                 this.pay_text = '支付成功'
                 this.pay_bad_status = 0
             }else if(this.order_info.status === 1){
                  this.pay_good = false
                  this.pay_text = '待支付'
                  this.pay_bad_status = 3
             }else if(this.order_info.status===4){
                  this.pay_good = true
                  this.pay_text = '支付成功'
                  this.pay_bad_status = 4
             }
         },
         copy_kami(){
                this.$copyText(this.order_info.kami).then(()=>{
                    this.$message({type:'success',message:'复制成功'})
                },()=>{
                    this.$message({type:'error',message:'复制失败'})
                })
         },
         async mock_pay(){
             const d = await this.$http.post('/web/order/api/mock_pay', {id: this.order_info._id})
             if(d.data.code === 1){
                 this.$message({type: 'success', message: '模拟支付成功！'})
                 this.fetch()
             }
         }
     }
}
</script>

<style>
.kami_info_main{
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 30px;
}
.order_pay_good{
    padding:20px;
    width: 450px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 102, 255, 0.08);
    display: grid;
    grid-template-columns: 35% 65%;
    grid-auto-rows: 40px;
    place-items: center center;
}

.order_pay_good_h{
    width: 100%;
    height: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    font-weight: 600;
    color: #475569;
}
.order_pay_good_i{
    width:100%;
    height: 100%;
    display: grid;
    justify-items: start;
    align-items: center;
    padding-left: 15px;
    color: #0f172a;
    font-weight: bold;
}
.b1{
     background-color: rgba(0, 102, 255, 0.05);
}
.b2{
    background-color: transparent;
}
.kami_info{
    padding:30px;
    width: 450px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 102, 255, 0.08);
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.pay_bad {
    text-align: center;
}
</style>