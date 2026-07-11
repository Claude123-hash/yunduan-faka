<template>
  <div class="goods_detail_page">
    <div class="goods_detail_1">
      <div class="goods_detail_info">
        <div class="goods_detail_d">
          <el-tag size="mini" type="primary">自动发卡</el-tag> 
          <span class="detail_title">{{goods.name}}</span>
        </div>
        
        <div class="goods_detail_price">价格: <span class="price_num">{{goods.price}}</span> 元</div>
        
        <div class="goods_detail_qq">
          <span class="label">商品库存</span>
          <el-tag type="success" size="small">{{goods.stock_now}}件</el-tag>
        </div>
        
        <div class="goods_detail_qq">
          <span class="label">购买数量</span>
          <el-input-number v-model="order.num" :min="1" :max="1" size="small"></el-input-number>
        </div>
        
        <div class="goods_detail_qq">
          <span class="label">下单手机号</span>
          <el-input v-model="order.qq_email" placeholder="输入手机号作为提卡凭证" size="small" style="width: 200px;"></el-input>
        </div>
        
        <div class="action_btn_wrap">
          <div class="goods_buy_btn" @click="create_order" :class="{disabled: goods.stock_now === 0}">
            {{ goods.stock_now === 0 ? '已售罄' : '确认并购买' }}
          </div>
        </div>
      </div>
      
      <div class="goods_detail_more" v-if="goods.description">
        <h3>商品说明:</h3>
        <div class="goods_detail_des"><span v-html="goods.description"></span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      goods: {},
      order: {
        num: 1,
        qq_email: '',
        password: 'default_password' // 保持一个默认密码以兼容后端模型，但不让用户输入
      }
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const d = await this.$http.post('/web/goods/api/get_goods', { id: this.id })
      this.goods = d.data.data
    },
    async create_order() {
      if (this.goods.stock_now <= 0) {
        this.$notify({
          title: '提示',
          message: '抱歉，该商品已售罄！',
          type: 'warning'
        });
        return;
      }
      if (!this.order.qq_email) {
        this.$notify({
          title: '注意',
          message: '请输入手机号，这是后续提取卡密的唯一凭证！',
          type: 'warning'
        });
        return;
      }
      const d = await this.$http.post('/web/order/api/create_order', { goods: this.goods, order: this.order })
      if (d.data.code === 1) {
        this.$router.push('/order_pay/' + d.data.data._id)
      }
    }
  }
}
</script>

<style>
.goods_detail_page {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
.goods_detail_1 {
  width: 700px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 102, 255, 0.08);
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.goods_detail_info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.goods_detail_d {
  border-bottom: 1px solid rgba(0, 102, 255, 0.1);
  padding-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
}
.detail_title {
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
}
.goods_detail_price {
  width: 100%;
  padding: 15px 20px;
  background: linear-gradient(135deg, rgba(0, 102, 255, 0.1), rgba(0, 179, 255, 0.1));
  color: #1e293b;
  font-size: 16px;
  font-weight: bold;
  border-radius: 12px;
  border-left: 4px solid #0066ff;
}
.price_num {
  font-size: 28px;
  color: #0066ff;
}
.goods_detail_qq {
  display: flex;
  align-items: center;
  gap: 20px;
}
.goods_detail_qq .label {
  font-weight: 600;
  color: #475569;
  width: 80px;
}
.action_btn_wrap {
  margin-top: 10px;
}
.goods_detail_more {
  border-top: 1px dashed rgba(0, 102, 255, 0.2);
  padding-top: 20px;
}
.goods_detail_more h3 {
  color: #0066ff;
  margin-bottom: 15px;
}
.goods_detail_des {
  background: rgba(255, 255, 255, 0.5);
  padding: 20px;
  border-radius: 12px;
  color: #334155;
  line-height: 1.6;
}
.disabled {
  opacity: 0.5;
  cursor: not-allowed !important;
}
</style>