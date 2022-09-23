<template>
  <div>
    <el-container>
      <el-aside width="200px">
            <el-menu
              router
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <GAsideMenu v-for="(item,i) in UserMenus" :key="i" :item="item"/>

            </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="left">
            <GBreadcrumb/>
          </div>
          <div class="right">

          </div>
          
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GAsideMenu from '@/components/GAsideMenu'
import GBreadcrumb from '@/components/GBreadcrumb'
export default {  
  computed:{
    ...mapGetters({
      UserMenus:'user/getUserMenus'
    }),
  },
  name:'Layout',
  components:{
    GAsideMenu,
    GBreadcrumb
  }
}
</script>

<style>
  .el-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-container{
    height: 100%;
  }
</style>