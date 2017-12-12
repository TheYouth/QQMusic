<template>
  <div class="song-list">
    <ul>     
      <li v-for="(song, index) in songs" class="item" @click="selectSong(song, index)" :class="{hightLight: song.id === currentSong.id}">
        <song-rank-simple :index="index" >
          <div class="content">
            <h2 class="name">{{song.name}}</h2>
            <p class="desc">{{getDesc(song)}}</p>
          </div>
        </song-rank-simple>
        <div class="currentIcon" v-if="song.id === currentSong.id">
          <i class="icon-playing"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
import SongRankSimple from '@/baseComponents/songRank/songranksimple'
import {mapGetters} from 'vuex'
// 基础组件，不涉及业务逻辑，点击后向父组件song.vue派发事件
	export default {
    props: {
      songs: {
        type: Array,
        default: []
      }
    },
    computed: {
      ...mapGetters([
        'currentIndex',
        'currentSong',
        'playing'
      ])
    },
    methods: {
      getDesc(s){
        return `${s.singer} · ${s.album}`
      },
      selectSong( song, index ){
        this.$emit( 'selectSong', song, index )
      },
      show(){
        return 
      }
    },
    mounted(){
      //console.log(this.currentSong.id)
    },
    components: {
      SongRankSimple
    }
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable"
@import "../../common/stylus/mixin"

  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      position: relative
      &.hightLight
        color: $color-theme !important
      &:after
        position: absolute
        height: 1px
        content: ''
        background: $color-text-d
        transform: scaleY(0.2)
        width: 100%
        top: 100%
      .currentIcon
        position: absolute
        right: 2px
        font-size: $font-size-large
      // .rank
      //   flex: 0 0 25px
      //   width: 25px
      //   margin-right: 30px
      //   text-align: center
      //   .icon
      //     display: inline-block
      //     width: 25px
      //     height: 24px
      //     background-size: 25px 24px
      //     &.icon0
      //       bg-image('first')
      //     &.icon1
      //       bg-image('second')
      //     &.icon2
      //       bg-image('third')
      //   .text
      //     color: $color-theme
      //     font-size: $font-size-large
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text-l
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
          width: 280px
</style>