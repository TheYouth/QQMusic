<template>
  <div class="player" v-show="playList.length">
    <transition name="full">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="hide_fullScreen">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="singerName"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
              <div class="cd-wrapper">
                <div class="cd"  :class=rotateCD>
                  <img class="image" v-lazy="currentSong.image">
                </div>
              </div>
          </div>tion>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{sortCurrentTime(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :progressPercent="progressPercent" @customProgress="customProgress"></progress-bar>
            </div>
            <span class="time time-r">{{sortCurrentTime(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left" :class=disabled>
              <i @click="prevSong" class="icon-prev"></i>
            </div>
            <div class="icon i-center" :class=disabled>
              <i @click="togglePlay" :class=toggleIcon></i>
            </div>
            <div class="icon i-right" :class=disabled>
              <i @click="nextSong" class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="show_fullScreen">
        <div class="icon">
          <img width="40" :src="currentSong.image" :class=rotateCD>
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        
          <div class="control">
            <little-progress :percent="progressPercent" :radius="radius">
              <i class="icon-mini" @click.stop="togglePlay" :class=miniToggleIcon ></i>
            </little-progress>
          </div>
        
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @canplay="canplay" @error="error" @timeupdate="_currentTime"></audio>
  </div>
</template>

<script type="text/javascript">
import {mapGetters, mapMutations} from 'vuex'
import ProgressBar from '@/baseComponents/progress/progress'
import LittleProgress from '@/baseComponents/circleProgress/circleProgress'
	export default {
    components: {
      ProgressBar,
      LittleProgress
    },
    data(){
      return {
        canBePlayed: false,
        currentTime: 0,
        radius: 32
      }
    },
   computed: {
    ...mapGetters([
        'fullScreen',
        'playList',
        'currentSong',
        'playing',
        'currentIndex'
      ]),
    singerName(){
      return `-  ${this.currentSong.singer}  -`
    },
    toggleIcon() {  // 根据this.playing改变图标class
      return this.playing ? "icon-pause" : "icon-play"
    },
    miniToggleIcon(){
      return this.playing ? "icon-pause-mini" : "icon-play-mini"
    },
    rotateCD(){  //旋转的CD
      return this.playing ? "play" : "play pause"
    },
    disabled(){  //弱网络环境下歌曲未load完成时图标变灰
      return this.canBePlayed ? '' : "disable"
    },
    progressPercent(){
      return this.currentTime / this.currentSong.duration
    }
   },
   methods: {
    hide_fullScreen(){
      this.switch(false)
    },
    show_fullScreen(){
      this.switch(true)
    },
    togglePlay(){  //点击提交mutations改变playing状态，通过watch这个playing的状态来播放暂停歌曲
      this.setPlayingState(!this.playing)
    },
    prevSong(){
      if( !this.canBePlayed ) { return }

      let index = this.currentIndex + 1
      if( index === this.playList.length ) { index = 0 }
      this.setCurrentIndex(index)

      this.canBePlayed = false 
    },
    nextSong(){
      if( !this.canBePlayed ) { return }

      let index = this.currentIndex + 1
      if( index === -1 ) { index = this.playList.length - 1 }
      this.setCurrentIndex(index) 

      this.canBePlayed = false 
    },
    canplay(){  //标识：歌曲canplay时置为true
      this.canBePlayed = true
    },
    error(){  //防止加载歌曲出错时播放器挂起
      this.canBePlayed = true
    },
    ...mapMutations({
      switch: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    }),
    // 当前歌曲播放事件进度
    _currentTime(e){
      this.currentTime = e.target.currentTime
    },
    sortCurrentTime(t){  //改变时间格式
      t = t | 0
      let minute = t / 60 | 0
      let second = this._pad( t % 60 )
      return `${minute}:${second}`
    },
    _pad(t){  //把时间统一变为两位数
      const n = 2
      let len = t.toString().length
      while( len < n ) {
        t = '0' + t
        len++
      }
      return t
    },
    // 接收progress组件派发的拉动进度条事件，这时改变歌曲播放进度
    customProgress(percent){
      this.$refs.audio.currentTime = percent * this.currentSong.duration
      if( !this.playing ){  //拖动进度条时如果歌曲是暂停的，那么还是可以播放
        this.togglePlay()
      }
    }
   },
   watch: {  
    currentSong(){  //在currentSong变化时执行播放，注意在dom ready后才能执行play方法
      this.$nextTick(() => {
        this.$refs.audio.play()
        this.setPlayingState(true)
      })
    },
    playing(val, oldVal){ 
      const audio = this.$refs.audio
      this.$nextTick(() => {
        val ? audio.play() : audio.pause()
      })
    }
   },
   created(){
    console.log(this.currentSong)
   }
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable"
@import "../../common/stylus/mixin"
  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          // &.cd-enter-active, &.cd-leave-active
          //   transition: all 0.4s cubic-bezier(.6,.35,.4,1.26)
          // &.cd-enter, &.cd-leave-to
          //   transform: translate3d(100%,0,0)
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%
          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.full-enter-active, &.full-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(.6,.35,.4,1.26)
        .middle
          .middle-l
            transition: all 0.4s cubic-bezier(.6,.35,.4,1.26)
      &.full-enter, &.full-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
        .middle
          .middle-l
            transform: translate3d(100%, 0, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0
  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>