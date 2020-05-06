<template>
  <div>
    <!-- 面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >权限管理</el-breadcrumb-item>
      <el-breadcrumb-item >权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card >
      <div class="text item">
        <!-- 权限列表区 -->
        <el-table
          :data="rightsList"
          :border="true"
          :stripe="true"
          style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column label="权限名称" prop="authName" ></el-table-column>
          <el-table-column label="路径" prop="path" ></el-table-column>
          <el-table-column label="权限等级" prop="level" >
            <template slot-scope="scope">
              <!-- 显示按钮级别 -->
              <el-tag  v-if="scope.row.level === '0'">一级</el-tag>
              <el-tag type="success" v-if="scope.row.level === '1'">二级</el-tag>
              <el-tag type="danger" v-if="scope.row.level === '2'">三级</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {
      // 权限列表
      rightsList: [],
      tableData: [{
        a: '1',
        b: '王小虎',
        c: '上海市',
        d: '普陀区',
        e: '金沙江',
        f: ' 1518 ',
        g: '弄'
      }],
      rightsColor: ['', 'success', 'danger']
    }
  },
  computed: {},
  created () {
    // 获取权限列表
    this.getRightsList()
  },
  methods: {
    async getRightsList () {
      const res = await this.$http.getRights()
      if (res.meta.status !== 200) {
        this.$message.error('获取权限列表失败')
      } else {
        this.rightsList = res.data
      }
    }
  },
  watch: {},
  components: {},
  filters: {}
}
</script>

<style scoped>

</style>
