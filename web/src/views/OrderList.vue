<template>
  <div class="order_query_page">
    <div class="query_header">
      <h1>订单查询</h1>
      <p>请输入您的下单手机号或订单编号进行查询</p>
    </div>
    
    <div class="order_list_container">
      <el-tabs v-model="activeName" class="glass_tabs">
        <el-tab-pane label="手机号一键查询" name="phone">
          <div class="query_form">
            <el-form :inline="true" :model="passform" @submit.native.prevent>
              <el-form-item label="下单手机号">
                <el-input v-model="passform.qq_email" placeholder="请输入购买时预留的手机号" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="passQuery" icon="el-icon-search">立即查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="订单编号精确查询" name="order_no">
          <div class="query_form">

            <el-form :inline="true" :model="order_no_form" @submit.native.prevent>
              <el-form-item label="订单编号">
                <el-input v-model="order_no_form.order_no" placeholder="请输入24位订单编号" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="orderNoQuery" icon="el-icon-search">精确查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div class="order_list_info" v-if="order_list.length > 0">
        <el-table
          :data="order_list"
          style="width: 100%"
          stripe>
          <el-table-column prop="_id" label="订单编号" width="220"></el-table-column>
          <el-table-column prop="goods_name" label="商品名称" width="180"></el-table-column>
          <el-table-column prop="kami" label="卡密" width="220">
            <template slot-scope="scope">
              <span v-if="scope.row.kami" style="color: #0066ff; font-weight: bold;">{{ scope.row.kami }}</span>
              <span v-else style="color: #94a3b8;">支付后显示</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="120">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status===1" type="danger">待支付</el-tag>
              <el-tag v-else-if="scope.row.status===2" type="success">交易成功</el-tag>
              <el-tag v-else-if="scope.row.status===3" type="success">已发货</el-tag>
              <el-tag v-else-if="scope.row.status===4" type="warning">无库存</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="copykami(scope.row)" type="text" size="mini" :disabled="!scope.row.kami">复制卡密</el-button>
              <el-button @click="go_order_detail(scope.row)" type="text" size="mini">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'phone',
      passform: { qq_email: '' },
      order_no_form: { order_no: '' },
      order_list: []
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      if (window.IDEEY && window.IDEEY.order_list) {
        this.order_list = window.IDEEY.order_list
      }
    },
    async passQuery() {
      if (!this.passform.qq_email) {
        this.$message({ type: 'error', message: '请输入手机号' })
        return;
      }
      // 不再传递 password
      const d = await this.$http.post('/web/order/api/query_pass', { qq_email: this.passform.qq_email })
      this.order_list = d.data.data
      window.IDEEY = { order_list: this.order_list }
    },
    async orderNoQuery() {
      if (this.order_no_form.order_no.match(/^[a-z0-9]{24}$/)) {
        const d = await this.$http.post('/web/order/api/query_orderNo', this.order_no_form)
        this.order_list = d.data.data
        window.IDEEY = { order_list: this.order_list }
      } else {
        this.$message({ type: 'error', message: '订单编号格式不正确' })
      }
    },
    copykami(row) {
      if (row.kami) {
        this.$copyText(row.kami).then(() => {
          this.$message({ type: 'success', message: '卡密复制成功' })
        }, () => {
          this.$message({ type: 'error', message: '复制失败' })
        })
      }
    },
    go_order_detail(row) {
      this.$router.push('/order_pay_good/' + row._id)
    }
  }
}
</script>

<style>
.order_query_page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}
.query_header {
  text-align: center;
  margin-bottom: 30px;
}
.query_header h1 {
  font-size: 28px;
  color: #0f172a;
  margin-bottom: 10px;
}
.query_header p {
  color: #64748b;
}
.order_list_container {
  width: 900px;
  min-height: 400px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 102, 255, 0.08);
}
.query_form {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.glass_tabs .el-tabs__item {
  font-size: 16px;
  font-weight: 600;
}
.order_list_info {
  margin-top: 20px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(0, 102, 255, 0.1);
}
.el-table th {
  background: rgba(0, 102, 255, 0.05) !important;
}
</style>