<template>
  <div id="app">
    <d-header></d-header>
    <tab></tab>
    <keep-alive>
    	<router-view></router-view>
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
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>