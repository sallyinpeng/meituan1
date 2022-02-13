<template>
  <el-row :gutter="20" class="home">
    <el-col :span="8" style="margin-top: 20px; padding-left: 20px;">
      <el-card shadow="hover">
        <div class="user">
          <img src="../../assets/images/avatar.png"/>
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <div class="login-time">
            <p>上次登录时间：</p>
            <p><span>2021-12-30</span></p></div>
          <div class="login-local"><p>上次登录地点：</p>
            <p><span>广州</span></p></div>
        </div>

      </el-card>
      <el-card style="height:470px;margin-top:20px">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            show-overflow-tooltip
            v-for="(item,key) in tableLabel" :key="key"
            :prop="key"
            :label="item"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px;display: flex; flex-wrap: wrap;">
      <div class="order-list">
        <el-card
          style="width:32%;"
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
          :body-style="{display:'flex',padding:0}"
        >
          <i class=icon
             :class="item.icon"
             :style="{background:item.color}"></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover" style="height:280px;width:100%">
        <echarts :chartData="echartData.order" style="height:280px"></echarts>
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <echarts :chartData="echartData.user" style="height:280px"></echarts>
        </el-card>
        <el-card shadow="hover">
          <echarts :chartData="echartData.video" style="height:280px" :isAxisChart="false"></echarts>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// import { getMenu } from '../../api/data'
import { getHome } from '../../api/data'
// import * as echarts from 'echarts'
import Echarts from '@/components/Echarts.vue'

export default {
  name: 'Home',
  components: {
    Echarts
  },
  data () {
    return {
      tableData: [],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'el-icon-success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'el-icon-star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 'el-icon-s-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'el-icon-success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'el-icon-star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 'el-icon-s-goods',
          color: '#5ab1ef'
        }
      ],
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      }
    }
  },
  methods: {
    getTableData () {
      getHome().then((res) => {
        this.tableData = res.data.tableData
        // console.log(res)
        const order = res.data.orderData
        // console.log(order)

        // 传给组件的值 （封装后）
        const keyArray = Object.keys(order.data[0])
        this.echartData.order.xData = order.date
        keyArray.forEach((key) => {
          this.echartData.order.series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: 'line'
          })
        })

        // 传给用户的值（封装后）
        this.echartData.user.xData = res.data.userData.map((item) => item.date)
        this.echartData.user.series.push({
          name: '新增用户',
          data: res.data.userData.map((item) => item.new),
          type: 'bar'
        })
        this.echartData.user.series.push({
          name: '活跃用户',
          data: res.data.userData.map((item) => item.active),
          type: 'bar'
        })

        // 饼状图  (封装后)
        this.echartData.video.series.push({
          data: res.data.videoData,
          type: 'pie',
          radius: [0, '70%']
        })
      })
    }
  },
  mounted () {
    this.getTableData()
  }
}
</script>

<style lang="less" scoped>
.home {

  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }

    .user-info {
      .name {
        font-size: 32px;
        margin-bottom: 10px;
      }

      .access {
        color: #999999;
      }
    }
  }

  .login-info {
    padding: 0 35px;

    .login-time, .login-local {
      display: flex;
      justify-content: space-between;

      p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;

        span {
          color: #666666;

        }
      }
    }
  }

  .order-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .el-card {
      width: 32%;
      margin-bottom: 20px;
    }

    .icon {
      font-size: 30px;
      width: 80px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }

    .detail {
      margin: 0 20px;
      //display: flex;
      //flex-direction: column;
      //justify-content: center;

      .num {
        font-size: 30px;
        margin-bottom: 10px;
      }

      .txt {
        font-size: 14px;
        text-align: center;
        color: #999999;
      }
    }
  }

  .graph {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .el-card {
      width: 48%;
      height: 280px;
    }
  }
}

</style>
