<template>
  <div class="goods_page_container">
    <!-- 分类导航栏 -->
    <div class="category_tabs">
      <div 
        class="tab_item" 
        :class="{ active: currentType === 'all' }" 
        @click="currentType = 'all'">
        全部商品
      </div>
      <div 
        class="tab_item" 
        v-for="type in types" 
        :key="type._id"
        :class="{ active: currentType === type._id }"
        @click="currentType = type._id">
        {{ type.name }}
      </div>
    </div>

    <!-- 商品列表 (无图版) -->
    <div class="good_list">
      <div class="goods_text_only" v-for="item in filteredGoods" :key="item._id">
        <div class="goods_info_top">
          <span class="goods_title">{{ item.name }}</span>
          <div class="stock_badge_text">库存: {{ item.stock || 0 }}</div>
        </div>
        
        <div class="goods_meta">
          <span class="goods_price">￥{{ item.price }}</span>
          <span class="goods_sales">已售: {{ item._id.toString().slice(-4).replace(/\D/g, '') || 128 }} 件</span>
        </div>
        
        <div class="goods_action">
          <div class="goods_buy_btn" @click="go_buy(item._id)">立即购买</div>
        </div>
      </div>
      
      <!-- 无商品提示 -->
      <div v-if="filteredGoods.length === 0" class="empty_state">
        <i class="el-icon-warning-outline"></i>
        <p>该分类下暂无商品</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      goods_list: [],
      types: [],
      currentType: 'all'
    }
  },
  computed: {
    filteredGoods() {
      if (this.currentType === 'all') return this.goods_list;
      return this.goods_list.filter(item => item.type && item.type._id === this.currentType);
    }
  },
  created(){
    this.fetch();
  },
  methods:{
    async fetch(){
      const d = await this.$http.post('/web/goods/api/get_goods')
      if(d.data.code === 1){
        let typesMap = {};
        let a = d.data.data.filter(el => {
          // 提取分类
          if (el.type && el.type._id && el.type.active === 1) {
            typesMap[el.type._id] = el.type;
          }
          return el.active === 1;
        });
        
        this.types = Object.values(typesMap).sort((a,b) => a.sort - b.sort);
        this.goods_list = a;
      }
    },
    go_buy(id){
      this.$router.push('/goods_detail/'+id)
    }
  }
}
</script>

<style>
.goods_page_container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

/* 分类导航栏样式 */
.category_tabs {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 15px 25px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 15px rgba(0, 102, 255, 0.05);
  flex-wrap: wrap;
}
.tab_item {
  padding: 8px 24px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  color: #475569;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.5);
}
.tab_item:hover {
  background: rgba(255, 255, 255, 0.8);
  color: #0066ff;
}
.tab_item.active {
  background: linear-gradient(135deg, #0066ff, #00b3ff);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
}

/* 商品列表区 (无图版) */
.good_list{
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  padding-bottom: 40px;
  justify-content: flex-start;
}
.goods_text_only{
  width: calc(33.333% - 17px); /* 一行3个更适合纯文本卡片 */
  height: 200px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(0, 102, 255, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}
@media (max-width: 900px) {
  .goods_text_only { width: calc(50% - 13px); }
}
@media (max-width: 600px) {
  .goods_text_only { width: 100%; }
}
.goods_text_only:hover{
  transform: translateY(-5px);
  box-shadow: 0 12px 40px 0 rgba(0, 102, 255, 0.2);
  border-color: rgba(0, 102, 255, 0.3);
}
.goods_info_top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}
.goods_title{
  font-weight: 700;
  font-size: 18px;
  color: #0f172a;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.stock_badge_text {
  background: rgba(0, 102, 255, 0.1);
  color: #0066ff;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
}
.goods_meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.goods_price{
  font-weight: 800;
  color: #0066ff;
  font-size: 24px;
}
.goods_sales {
  font-size: 13px;
  color: #94a3b8;
}
.goods_action{
  width: 100%;
}
.goods_buy_btn{
  width: 100%;
  padding: 12px 0;
  border-radius: 12px;
  background: linear-gradient(135deg, #0066ff, #00b3ff);
  color: white;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 102, 255, 0.3);
  transition: all 0.3s;
  text-align: center;
}
.goods_buy_btn:hover{
  box-shadow: 0 6px 20px rgba(0, 102, 255, 0.5);
  transform: translateY(-2px);
}
.empty_state {
  width: 100%;
  padding: 50px;
  text-align: center;
  color: #94a3b8;
  font-size: 16px;
}
.empty_state i {
  font-size: 40px;
  margin-bottom: 10px;
  color: #cbd5e1;
}
</style>