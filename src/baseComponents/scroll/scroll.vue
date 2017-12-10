<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    probeType:{
      type: Number,
      default: 1
    },
    click:{
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      dafault: []
    },
    listenScroll: {  //默认不监听滚动事件
      type: Boolean,
      default: false
    }
  },
  watch: {
    data(){
      setTimeout( () => {
        this._refresh()
      }, 20);
    }
  },
  mounted(){
    setTimeout( () => {
      this._initScroll()
    }, 20);
  },
  methods: {
    _initScroll(){
      this.scroll = new BScroll( this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      } )
      // 如果需要监听滚动事件
      if( this.listenScroll ){
        let _this = this
        this.scroll.on( 'scroll', (pos) => {
          _this.$emit( 'scroll', pos )
        } )
      }
    },
    _enable(){
      this.scroll && this.scroll.enable()
    },
    _disable(){
      this.scroll && this.scroll.disable()
    },
    _refresh(){
      this.scroll && this.scroll.refresh()
    },
    _scrollTo(){
      this.scroll && this.scroll.scrollTo.apply( this.scroll, arguments )
    },
    _scrollToElement(){
      this.scroll && this.scroll.scrollToElement.apply( this.scroll, arguments )
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">


</style>