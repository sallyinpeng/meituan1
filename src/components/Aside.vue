<template>
  <el-menu class="el-menu-vertical-demo"
           :collapse="isCollapse"
           background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b"
           style="height:100%"
  >
    <h3 v-show="!isCollapse">后台管理系统</h3>
    <h3 v-show="isCollapse">后台</h3>
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
      @click="clickMenu(item)">
      <i :class="item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu :index="item.label" v-for="item in hasChildren" :key="item.label">
      <template slot="title">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <!--        <el-menu-item :index="item.path" v-for="item in item.children" :key="item.path">{{ item.label }}</el-menu-item>-->
        <el-menu-item :index="subItem.path"
                      v-for="(subItem,subIndex) in item.children"
                      :key="subIndex"
                      @click="clickMenu(item)">
          <i :class="subItem.icon"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'Aside',
  data () {
    return {
      menu: [
        {
          path: '/',
          name: 'Home',
          label: '首页',
          icon: 'el-icon-s-home',
          url: 'Home/Home'
        },
        {
          path: '/mall',
          name: 'Mall',
          label: '商品管理',
          icon: 'el-icon-menu',
          url: 'MallManage/MallManage'
        },
        {
          path: '/user',
          name: 'User',
          label: '用户管理',
          icon: 'el-icon-s-check',
          url: 'UserManage/UserManage'
        },
        {
          label: '其它',
          icon: 'el-icon-s-opportunity',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'el-icon-s-claim',
              url: 'Other/PageOne'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'el-icon-s-claim',
              url: 'Other/PageTwo'
            }]
        }
      ]
    }
  },
  methods: {
    clickMenu (item) {
      this.$router.push({ name: item.name })
      this.$store.commit('selectMenu', item)
    }
  },
  computed: {
    noChildren () {
      return this.menu.filter((item) => !item.children)
    },
    hasChildren () {
      return this.menu.filter((item) => item.children)
    },
    isCollapse () {
      return this.$store.state.tab.isCollapse
    }
  }
}
</script>

<style lang="less">
.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 920px;

}

.el-menu {
  //min-height: 920px;
  //  background-color: #545c64;
  //  color: #fff;
  //
  //  .active {
  //    color: #ffd04b;
  //  }
  //

  h3 {
    margin-top: 15px;
    margin-bottom: 15px;
    color: #8492a6;
  }

}
</style>
