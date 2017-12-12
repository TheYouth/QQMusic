<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Doge音乐</h1>
<!--     <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link> -->
  </div>
</template>

<script type="text/javascript">
 
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0
    background: $color-theme
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: 32px
      height: 32px
      margin-right: 9px
      bg-image('logo')
      background-size: 32px 32px
    .text
      font-weight: bold
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
      color: $color-background
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
</style>