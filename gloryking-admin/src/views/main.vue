<template>
    <el-container style="height: 100vh;">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <!-- 加上default-active解决路由跳转后菜单高亮不变化问题↓ -->
    <el-menu :default-openeds="['1', '3']" router :default-active="this.$route.path" >
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>内容管理</template>
        <el-menu-item-group>
          <template slot="title">分类</template>
          <el-menu-item index="/categories/new">新建分类</el-menu-item>
          <el-menu-item index="/categories/list">分类列表</el-menu-item>
        </el-menu-item-group>
         <el-menu-item-group>
          <template slot="title">物品</template>
          <el-menu-item index="/items/new">新建物品</el-menu-item>
          <el-menu-item index="/items/list">物品列表</el-menu-item>
        </el-menu-item-group>
         <el-menu-item-group>
          <template slot="title">英雄</template>
          <el-menu-item index="/heros/new">新建英雄</el-menu-item>
          <el-menu-item index="/heros/list">英雄列表</el-menu-item>
        </el-menu-item-group>
          <el-menu-item-group>
          <template slot="title">文章</template>
          <el-menu-item index="/articles/new">新建文章</el-menu-item>
          <el-menu-item index="/articles/list">文章列表</el-menu-item>
        </el-menu-item-group>
         <el-menu-item-group>
          <template slot="title">广告</template>
          <el-menu-item index="/ads/new">新建广告位</el-menu-item>
          <el-menu-item index="/ads/list">广告位列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">管理员</template>
          <el-menu-item index="/adminusers/new">添加管理员</el-menu-item>
          <el-menu-item index="/adminusers/list">管理员一览</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header style="text-align: left; font-size: 20px">
      <el-row>
        <el-col :span="8">
          <span>周yc的小后台</span>
        </el-col>
        <el-col :span="8" :offset="8" class="headcol">
<el-button v-if="islogin" @click="login">登陆</el-button>
      <el-button v-else @click="out">退出登录</el-button>
        </el-col>
      </el-row>
      
    </el-header>
    
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<style>
*{
  margin: 0;
  padding: 0;
}
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  /* -----------↓带有图片的增加和删除功能中的公共样式 */
  .rowtest{
flex-wrap:wrap;
}
.rate1{
  margin-top: 0.6rem;
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    min-width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    min-width: 5rem;
    height: 5rem;
    display: block;
  }
  .headcol{
   text-align: end;
   margin-top: -3px;
  }
</style>

<script>
  export default {
    data() {
      return {
        islogin:true
      }
    },
    methods: {
      async isshowlogin(){
        try {
             await this.$http.get('/isshowlogin')
             this.islogin = false
        } catch (error) {
               this.islogin = true
        }
     
      },
      login(){
        this.$router.push('/login')
      },
      out(){
        localStorage.clear()
        this.$router.push('/login')
        this.$message({
          type:'success',
          message:'退出成功',
          duration:600
        })
      }
    },
    created() {
      this.isshowlogin()
    },
  };
</script>