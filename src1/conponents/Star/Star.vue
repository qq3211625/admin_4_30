<template>
  <!--在外面 (传入分数) 与  (24,36,48) 不同组件 -->
  <div class="star " :class="`star-${size}`" >
    <span class="star-item " v-for="(star, index) in starClaseArr" :class="star" :key="index"> </span>

  </div>
</template>

<script>
    export default {
      props: {
        score: Number,
        size: Number
      },
      computed:{
        starClaseArr(){
          const {score} = this
          // const a = 3.4
          let arr = [];
          // //向arr添加N个on
          const on = Math.floor(score)
          for(let i=0; i<on; i++){
            arr.push('on')
          }
          // //向arr添加0-1个half
          if (score*10 - on*10 > 0.4*10){
            arr.push('half')
          }
          // //向arr添加m个off
          if(arr.length<=4){
            for(let j=0; j <= (5-arr.length); j++){
              arr.push('off')
            }
          }
          return arr
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"  //用到的混合
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')

</style>
