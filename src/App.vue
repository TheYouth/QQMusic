<template>
  <div id="app">
    <d-header></d-header>
    <tab></tab>
    <keep-alive>
      <transition :name="dir">
    	  <router-view></router-view>
      </transition>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import DHeader from '@/components/header/header'
import Tab from '@/components/tab/tab'
import Player from '@/components/player/player'
export default {
  components: {
  	DHeader,
  	Tab,
    Player
  },
  data(){
    return {
      dir: "left"
    }
  },
  watch: {
    $route(to, from) {
      if(to.meta.index > from.meta.index) {
        this.dir = "left"
      }else if( to.meta.index < from.meta.index ) {
        this.dir = "right"
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.left-enter-active, .left-leave-active
  transition: all 0.3s
.left-enter
  transform: translate3d(100%, 0, 0)
.left-leave-to
  transform: translate3d(-100%, 0, 0)

.right-enter-active, .right-leave-active
  transition: all 0.3s
.right-enter
  transform: translate3d(-100%, 0, 0)
.right-leave-to
  transform: translate3d(100%, 0, 0)
</style>