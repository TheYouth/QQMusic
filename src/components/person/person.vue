<template>
    <div class="wrapper">
      <div class="login-header">
        <i class="icon-fanhui" @click="back"></i>
        <p class="title">个人中心</p>
        <span class="loginout" @click="loginOut">退出</span>
      </div>
      <div class="flex">
        <div class="img">
          <img src="./person.png">
        </div>
        <div class="info">
          <h2>{{username}}</h2>
          <p>简介：我是一只鱼</p>
        </div>
      </div>     
    </div>
</template>

<script type="text/javascript">
 export default {
  data() {
    return {
      username: name
    }
  },
  methods: {
    back(){
      this.$router.push({
        path: '/recommend'
      })
    },
    loginOut() {
      this.$local.clear()
      this.$router.go(-2)
    }    
  },
  created() {
    this.username = this.$local.get("name").value
  }
 }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
.wrapper
  position: fixed
  top: 0
  bottom: 0
  z-index: 100
  width: 100%
  background: $color-background
  .login-header
    position: relative
    top: 0
    left: 0
    width: 100%
    height: 44px
    line-height: 44px
    background: $color-theme
    text-align: center
    .icon-fanhui
      position: absolute
      display: inline-block
      margin-left: 10px
      font-size: $font-size-large-xl
      left: 0
    .title
      font-size: $font-size-large-x
    .loginout
      position: absolute
      right: 10px
      top: 0
  .flex
    display: flex
    padding: 16px
    border-bottom: 1px solid $color-text-d
    .img
      width: 60px
      height: 60px
      border-radius: 50%
      overflow: hidden
      margin-right: 16px
    .info
      display: flex
      flex-direction: column
      justify-content: space-around
      h2
        color: $color-sub-theme
      p
      color: $color-text-d
</style>