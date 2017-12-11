<template>
  <div class="song_wrapper">
    <div class="rank">{{index + 1}}</div>
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
	export default {
    props: {
      index: {
        type: Number,
        default: 0
      }
    }
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable"

.song_wrapper
  display: flex
  .rank
    line-height: 20px
    margin-right: 10px
    font-size: $font-size-medium  


</style>