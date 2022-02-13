<template>
  <div class="tag">
    <el-tag
      v-for="(tag,index) in tags"
      :key="tag.name"
      size="small"
      :closable="tag.name!=='home'"
      :effect="$route.name===tag.name?'dark':'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag,index)"
    >{{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Tag',
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList
    })
  },
  methods: {
    ...mapMutations({
      close: 'closeTag'
    }),
    changeMenu (item) {
      this.$router.push({ name: item.name })
      this.$store.commit('selectMenu', item)
    },
    handleClose (tag, index) {
      // if (this.tabsList && this.tabsList.length > 0) { //自己写的无效
      //   this.tabsList.splice(this.tabsList.indexOf(tag), 1)
      //   console.log(this.tabsList.indexOf(tag))
      // }
      // 判断是否是最后一个
      const length = this.tags.length - 1
      this.close(tag)

      // 第一种情况
      if (tag.name !== this.$route.name) {
        return
      }
      if (index === length) {
        // 往左边跳转
        this.$router.push({
          name: this.tags[index - 1].name
        })
      } else {
        // 往右边跳转
        this.$router.push({ name: this.tags[index].name })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tag {
  text-align: left;
  padding: 10px 0 0 10px;

  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
