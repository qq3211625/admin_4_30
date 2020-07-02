<template>
  <div>
    <!-- :on-preview 预览已上传图片回调  :on-remove 删除回调   list-type 上传后图片的预览效果picture-card缩列图  :on-success上传成功的回调-->
    <el-upload
      :action="imageUrl"
      :headers="headersToken"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleAvatarSuccess"
      :file-list="fileList"
      list-type="picture-card"
      :multiple="false"
      :limit=4
      :before-upload="beforeAvatarUpload"
    >
      <!--<el-button size="small" type="primary">点击上传</el-button>-->
      <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过1MB</div>
      <i v-if="fileList.length >= 4" class="el-icon-circle-close" style="font-size: 60px"></i>
      <i v-else class="el-icon-plus" ></i>
    </el-upload>
    <!-- 预览图片全局弹窗 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Test',
  props: {},
  data () {
    return {
      // 回显的图片列表
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      dialogImageUrl: '', // 预览图片地址
      dialogVisible: false, // 全局弹窗
      imageUrl: 'http://127.0.0.1:8888/api/private/v1/upload', // 上传图片接口
      // 组件封装的ajax请求,我们对他设置请求头
      headersToken: {
        Authorization: window.sessionStorage.getItem('token')
      }
    }
  },
  methods: {
    // 文件上传成功后的回调
    handleAvatarSuccess (res, file, fileList) {
      // console.log(res)
      // console.log(file)
      // if (res.meta.status === 200) {
      //   const imgObj = {
      //     name: res.data.tmp_path,
      //     url: res.data.url
      //   }
      //   this.fileList.push(imgObj)
      // }
      // console.log(this.fileList)
      this.fileList = fileList
      console.log(this.fileList)
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeAvatarUpload (file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 1

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isJPG && isLt2M
    },
    // 处理图片预览操作
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 处理图片删除操作(点击删除回调)
    handleRemove (file, fileList) {
      this.fileList = fileList
      console.log(file)
      console.log(this.fileList)
      // 删除调用删除图片接口
    }
  },
  computed: {},
  watch: {},
  components: {},
  filters: {}
}
</script>

<style scoped>
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
