<template>
  <div>
    <!-- 面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >权限管理</el-breadcrumb-item>
      <el-breadcrumb-item >角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <div class="text item">
        <!-- 栅格系统 搜索区-->
        <el-row :gutter="20">
          <el-col :span="4">
            <el-button type="primary" > 添加用户 </el-button>
          </el-col>
        </el-row>
        <!-- 权限列表区 -->
        <el-table
          :data="roleList"
          :border="true"
          :stripe="true"
          style="width: 100%">
          <!-- 可以展开的列表项,下面是他的模板 -->
          <el-table-column type="expand" width="50">
              <template slot-scope="scope">
                  <!-- 栅格系统 搭建 树状图 -->
                  <el-row class="dbbottom itemflex" :class="{dbtop: index === 0}" v-for="(item, index) in scope.row.children" :key="item.id">
                      <!-- 渲染一级权限 -->
                      <el-col :span="4">
                        <el-tag closable @close="callOff(scope.row, item.id)" item>{{item.authName}}</el-tag>
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                      <!-- 渲染二级权限 -->
                      <el-col :span="19">
                          <el-row v-for="item2 in item.children" :key="item2.id" class="dbbottom itemflex" :class="{dbtop: index === 0}">
                            <el-col :span="6">
                              <el-tag type="success" closable @close="callOff(scope.row, item2.id)">{{item2.authName}}</el-tag>
                              <i class="el-icon-caret-right"></i>
                            </el-col>
                            <!-- 三级权限 -->
                            <el-col :span="12" >
                              <el-col :span="8" v-for="item3 in item2.children" :key="item3.id">
                                <el-tag type="warning" closable @close="callOff(scope.row, item3.id)">{{item3.authName}}</el-tag>
                              </el-col>
                            </el-col>
                          </el-row>
                      </el-col>
                  </el-row>
              </template>
          </el-table-column>
          <el-table-column label="角色名称" prop="roleName" ></el-table-column>
          <el-table-column label="角色描述" prop="roleDesc" ></el-table-column>
          <el-table-column label="操作"  >
              <template slot-scope="scope">
                  <!-- 修改按钮 -->
                  <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
                  <!-- 删除按钮 -->
                  <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
                  <!-- 分配角色按钮 -->
                  <el-button size="mini" @click="setting(scope.row)" type="warning" icon="el-icon-setting"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <!-- 添加用户 对话框 只是一个全局的弹窗-->
    <el-dialog
      title="分配权限"
      :visible.sync="dialogVisible"
      width="40%">
        <!-- 分配权限主体树状图 -->
        <el-tree
          :data="roleListChildren"
          show-checkbox
          ref="tree"
          :default-checked-keys="roleListChildrenUserId"
          node-key="id"
          :default-expand-all="true"
          :props="defaultProps">
        </el-tree>
        <!-- 这是按钮区域 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="getCheckedKeys">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {
      // 所有角色列表数据
      roleList: [],
      tableData: [{
        a: '1',
        b: '王小虎',
        c: '上海市',
        d: '普陀区',
        e: '金沙江',
        f: ' 1518 ',
        g: '弄'
      }],
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      roleListChildren: [], // 当前能分配权限的所有树状数据
      roleListChildrenUser: [], // 当前用户拥有的权限
      roleListChildrenUserId: [], // 当前用户拥有的权限ID
      roleId: '' // 当前主管id
    }
  },
  computed: {},
  created () {
    // 获取权限列表
    this.getRoleList()
  },
  methods: {
    // 获取角色数据
    async getRoleList () {
      const res = await this.$http.getRoles()
      // console.log(res)
      if (res.meta.status !== 200) {
        this.$message.error('获取权限列表失败')
      } else {
        this.roleList = res.data
        // console.log(this.roleList)
      }
    },
    callOff (role, rightId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const req = {roleId: role.id, rightId}
        const res = await this.$http.roleId(req)
        if (res.meta.status !== 200) {
          this.$message.error('删除失败')
          return
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        // this.getRoleList() // 重新获取权限列表 会造成页面整个DOM的更新 可以提取出children来赋值
        // scope.row是当前角色的对象
        // res.data 修改后返回整个角色的权限信息children
        role.children = res.data // 难点-其实就是修改对象属性,而不是修改整个this.roleList
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 设置权限管理
    async setting (scopeRow) {
      this.dialogVisible = true // 显示表格
      this.roleId = scopeRow.id
      // console.log(this.roleId)
      // 请求获后所有权限数据
      const roleListChildrenUserId = [] // 收集权限id 收集第三层就可以了
      // 一层循环
      scopeRow.children.forEach((item, index) => {
        // roleListChildrenUserId.push(item.id) // 第一层选中,所有的子层都会被选中  注意
        // 二层循环
        item.children.forEach((item1, index) => {
          // roleListChildrenUserId.push(item1.id)
          // 三层循环
          item1.children.forEach((item1, index) => {
            roleListChildrenUserId.push(item1.id)
          })
        })
      })
      this.roleListChildrenUserId = roleListChildrenUserId // 收集权限id完成
      const res = await this.$http.getRightsT()
      // console.log(res)
      if (res.meta.status !== 200) {
        this.$message.error('获取权限列表失败')
      } else {
        this.roleListChildren = res.data
        // console.log(this.roleListChildren)
      }
    },
    // 修改角色管理权限
    async getCheckedKeys () {
      // console.log(this.$refs.tree.getHalfCheckedKeys()) // 返回半勾选状态的id
      // console.log(this.$refs.tree.getCheckedKeys()) // 此方法只能获取全选状态的id
      const rid = this.$refs.tree.getHalfCheckedKeys().concat(this.$refs.tree.getCheckedKeys()).join(',')
      // 请求参数
      // console.log(this.roleId)
      const id = this.roleId
      const res = await this.$http.changeRoles(id, {rid})
      if (res.meta.status !== 200) {
        this.$message.error('修改失败')
      } else {
        this.getRoleList() // 重新获取权限数据
        this.dialogVisible = false // 关闭表格
      }
    }
  },
  watch: {},
  components: {},
  filters: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .el-button{
  margin-bottom: 15px;
  }
  .el-tag{
    margin 7px
  }
  .dbtop {
    border-top: 1px solid #EBEEF5;
  }
  .dbbottom {
      border-bottom: 1px solid #EBEEF5;
    }
  .itemflex{
    display flex
    align-items center
  }
</style>
