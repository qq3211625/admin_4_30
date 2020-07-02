<template>
  <div>
    <!-- 面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/users' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item >用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card >
      <div class="text item">
        <!-- 栅格系统 搜索区-->
        <el-row :gutter="20">
          <el-col :span="10">
            <!-- 搜索域添加区域 -->
            <el-input placeholder="请输入内容" :clearable="true" @clear="getUserList()" v-model="queryInfo.query">
              <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="dialogVisible = !dialogVisible"> 添加用户 </el-button>
          </el-col>
        </el-row>
        <!-- 用户表格区 -->
        <el-table
          :data="userList"
          :border="true"
          :stripe="true"
          style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column label="姓名" prop="username" ></el-table-column>
          <el-table-column label="邮箱" prop="email" ></el-table-column>
          <el-table-column label="电话" prop="mobile" ></el-table-column>
          <el-table-column label="角色" prop="role_name" ></el-table-column>
          <el-table-column label="状态" prop="" >
            <!-- 作用域插槽 -->
            <template slot-scope="scope">
            {{scope.row.mg_state}}
            <!-- 加入组件开关 -->
            <el-switch
              @change="userSwitch(scope.row)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
          </el-table-column>
          <el-table-column label="操作" width="181px">
            <!-- 作用域插槽 scope当前一横的所有数据 -->
            <template slot-scope="scope">
                <!-- 修改按钮 -->
                <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
                <!-- 删除按钮 -->
                <el-button size="mini" type="danger" @click="open(scope.row.id)" icon="el-icon-delete"></el-button>
                <!-- 提示信息分配角色 -->
                <el-tooltip class="item" effect="dark" content="分配角色" :enterable="false" placement="top">
                    <!-- 分配角色按钮 -->
                    <el-button size="mini" type="warning" icon="el-icon-setting" @click="setRole(scope.row)">
                    </el-button>
                </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.pagesize"
          :current-page="queryInfo.pagenum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <!-- 添加用户 对话框 只是一个全局的弹窗-->
        <el-dialog
          title="添加用户"
          :visible.sync="dialogVisible"
          width="30%">
          <!-- 这是头部主体 -->
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="Email">
              <el-input v-model="ruleForm.Email"></el-input>
            </el-form-item>
          </el-form>
          <!-- 这是按钮区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="submitOff">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 添加分配权限 对话框 只是一个全局的弹窗-->
        <el-dialog
          title="分配权限"
          :visible.sync="dialogVisibleRoles"
          width="50%">
          <!-- 分配权限主体树状图 -->
          <div class="userSet">
            <p>当前用户: {{userinfo.usernamer}}</p>
            <p>当前角色: {{userinfo.role_name}}</p>
            <div style="display: flex" >
              <p style="margin-right: 15px">分配角色</p>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <!-- 这是按钮区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleRoles = false">取 消</el-button>
            <el-button type="primary" @click="saverRoleInfo">确 定</el-button>
        </span>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    // 验证邮箱
    var checkEmail = (rule, value, cb) => {
      // 定义正则
      const regEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
      if (regEmail.test(value)) { // 判断value是否通过正则
        this.ruleForm.Email = value // 收集数据
        return cb()
      } else { // 不通过
        cb(new Error('请输入正确的邮箱'))
      }
    }
    return {
      ruleForm: {
        Email: '',
        username: '',
        password: ''
      }, // 添加用户表单数据
      rules: {
        Email: [
          { required: true, validator: checkEmail, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }, // 加用户表单验证规则
      // 获取用户列表参数
      queryInfo: {
        query: '', // 搜索请请求
        pagenum: 1, // 请求页码数
        pagesize: 2 // 每页的条数
      },
      userList: [], // 用户列表
      total: 0, // 总条数
      tableData: [{
        a: '1',
        b: '王小虎',
        c: '上海市',
        d: '普陀区',
        e: '金沙江',
        f: ' 1518 ',
        g: '弄'
      }],
      dialogVisible: false, // 添加用户对话框显示隐藏
      dialogVisibleRoles: false, // 添加分配权限对话框显示隐藏
      userinfo: {}, // 需要被分配角色用户信息
      // 模拟数据
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '' // 分配的角色id
    }
  },
  computed: {},
  methods: {
    // 请求用户列表
    async getUserList () {
      const ruqUser = {
        query: this.queryInfo.query,
        pagenum: this.queryInfo.pagenum,
        pagesize: this.queryInfo.pagesize
      }
      const res = await this.$http.getUserList(ruqUser)
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      } else {
        this.userList = res.data.users
        this.total = res.data.total
      }
      // console.log(this.userList)
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.queryInfo.pagesize = val // 更改每页的条数
      this.getUserList() // 发起请求
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.queryInfo.pagenum = val // 更改当前页
      this.getUserList() // 发起请求
    },
    // 监听switch状态的改变
    async userSwitch (userInfo) {
      console.log(userInfo)
      const req = {
        id: userInfo.id,
        state: userInfo.mg_state
      }
      const res = await this.$http.userSwitch(req)
      console.log(res)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        this.$message.error('修改用户状态失败')
      } else {
        this.$message.success('修改用户状态成功')
      }
    },
    // 点击搜索用户
    searchUser () {
      this.getUserList()
    },
    // 点击添加用户
    submit () {
      this.$refs.ruleForm.validate(async (valid) => { // 拿到元素节点el-form
        if (valid) { // 当通过Form所有效验 返回true
          alert('添加成功') // 这里在发请求
          const req = {
            Email: this.ruleForm.Email,
            username: this.ruleForm.username,
            password: this.ruleForm.password
          }
          const res = await this.$http.addUsers(req) // 发送请求
          if (res.meta.status !== 201) {
            alert('添加失败') // 这里在发请求
          } else {
            alert('添加成功') // 这里在发请求
            this.getUserList() // 重新请求列表
          }
          console.log(res)
        } else { // 效验失败
          alert('添加失败')
        }
      })
      this.dialogVisible = false // 关闭窗口
      this.$refs.ruleForm.resetFields() // 重置form表单
    },
    // 点击取消添加用户
    submitOff () {
      this.$refs.ruleForm.resetFields() // 重置form表单
      this.dialogVisible = false // 关闭窗口
    },
    // 删除当前用户
    open (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.$message({ // 确定的回调
          type: 'success',
          message: '发送删除请求!'
        })
        // 发送删除请求
        const res = await this.$http.delete({id})
        if (res.meta.status === 200) {
          this.getUserList() // 从新请求用户列表
          alert('删除成功')
        } else { alert('删除数百') }
      }).catch(() => { // 取消的回调
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 展示分配列表
    async setRole (userinfo) {
      this.userinfo = userinfo
      // console.log('111', this.userinfo)
      this.dialogVisibleRoles = true
      const res = await this.$http.getRolesList()
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      } else {
        this.options = res.data
        console.log(this.options)
      }
    },
    // 点击按钮分配角色
    async saverRoleInfo () {
      if (!this.value) {
        return
      }
      const req = {
        id: this.userinfo.id,
        rid: this.value
      }
      console.log(req)
      const res = await this.$http.allotRole(req)
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      } else {
        this.$message.success('设置成功')
        this.getUserList()
        this.dialogVisibleRoles = false
      }
    }
  },
  created () {
    this.getUserList()
  },
  mounted () {
  },
  watch: {},
  components: {},
  filters: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .box-card {
    width: 100%;
  }
  .el-table{
    margin-top: 15px;
    font-size: 12px;
  }

  .el-pagination{
    margin-top: 15px;
  }
  .userSet{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>
