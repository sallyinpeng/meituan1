<template>
  <el-container style="height:100%">
    <el-aside width="auto">
      <Aside/>
    </el-aside>
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <Tag/>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'
import Tag from '@/components/Tag.vue'

export default {
  name: 'Main',
  components: {
    Aside,
    Header,
    Tag
  }
}
</script>

<style lang="less" scoped>

.el-header {
  background-color: #333;
}

.el-main {
  padding: 0;
}

</style>
