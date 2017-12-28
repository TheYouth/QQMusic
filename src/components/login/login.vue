<template>
  <transition>
    <div class="wrapper">
      <div class="login-header">
        <i class="icon-fanhui" @click="back"></i>
        <p class="title">登录</p>
      </div>
      <div class="login-content">
        <div class="input-group">
          <input type="text" class="input" placeholder="请输入账号" />
          <input type="text" class="input" placeholder="请输入密码" />
        </div>
        <div class="login-btn">
          <input type="button" value="登录" class="btn">
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/javascript">
 export default {
  methods: {
    back(){
      this.$router.back()
    }
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
  &.v-enter-active, &.v-leave-active
    transition: all 0.3s
  &.v-enter, &.v-leave-to
    transform: translate3d(-100%, 0, 0)
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
      font-size: $font-size-large-xl
  .login-content
    height: 100%
    padding: 20px 
    margin-top: 50px 
    .input-group
      width: 100% 
      height: 100px
      border-radius: 5px
      overflow: hidden
      // background: orange
      .input
        width: 100%
        height: 50%
        padding-left: 10px
        outline: none
    .login-btn
      width: 100%
      height: 50px
      border-radius: 5px
      overflow: hidden
      margin-top: 20px
      .btn
        width: 100%
        height: 100%
        background: $color-theme
        color: $color-background

</style>