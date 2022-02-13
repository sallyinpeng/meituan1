<template>
  <!--  <div class="header">-->
  <header>
    <div class="header-left">
      <el-button plain icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{ current.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-right">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img class="avatar" src="../assets/images/avatar.png"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!--  </div>-->
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  data () {
    return {
      //   userImg:require("../assets/images/avatar.png")
    }
  },
  methods: {
    handleMenu () {
      this.$store.commit('CollapseMenu')
    }
  },
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu
    })
  }
}
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  .header-left {
    display: flex;
    text-align: center;

    .el-button {
      margin-right: 20px;
    }

    .el-breadcrumb {
      padding-top: 7px;

      /deep/ .el-breadcrumb__item {
        .el-breadcrumb__inner {
          color: #666;
          font-weight: normal;
        }

        &:last-child {
          .el-breadcrumb__inner {
            color: white;
          }
        }
      }
    }
  }

  .header-right {
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

}
</style>
