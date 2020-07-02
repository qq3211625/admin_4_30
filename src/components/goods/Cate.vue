<template>
  <div>
    <div class="block">
      <span class="demonstration">hover 触发子菜单</span>
      <el-cascader
        v-model="value"
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"
        :clearable="true">
      </el-cascader>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {
      value: [],
      options: [{
        value: '1',
        label: '指南',
        children: [
          {
            value: '1-1',
            label: '设计原则',
            children: [{
              value: '1-1-1',
              label: '一致'
            }, {
              value: '1-1-2',
              label: '反馈'
            }]
          },
          {
            value: '1-2',
            label: '导航',
            children: [{
              value: '1-2-1',
              label: '侧向导航'
            }, {
              value: '1-2-2',
              label: '顶部导航'
            }]
          }]
      }]
    }
  },
  computed: {},
  methods: {
    handleChange (value) {
      console.log(value)
    }
  },
  mounted () {},
  watch: {},
  components: {},
  filters: {}
}
</script>

<style scoped>

</style>
