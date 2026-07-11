<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login"  label-width='auto'>
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
        
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {

  data(){
    return {
      model: {}
    }
  },
  methods: {
    async login(){
      if(!(this.model.username && this.model.password)){
        this.$message({type:'error',message:'用户名及密码 不能为空！'})
        return false
      }
      if(!/^[a-z][0-9a-z_]{5,14}$/.test(this.model.username)){
        this.$message({type:'error',message:'用户名为：字母开头,6-15位字母及数字_'})
        return false
      }

      const res = await this.$http.post('/admin/call/login', this.model)
      // sessionStorage.token = res.data.token
      localStorage.token = res.data.token
      this.$router.push('/')
      this.$message({
        type: 'success',
        message: '登录成功'
      })
    }
  }
}
</script>

<style>
.login-container{
  background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
  width: 100vw;
  height: 100vh;
  padding-top:5rem;
  display: flex;
  justify-content: center;
}
.login-card {
  width: 25rem;
  height: max-content;
  background: rgba(255, 255, 255, 0.4) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
  border-radius: 15px !important;
}
</style>
