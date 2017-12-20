<template>
<div class="recommend" ref="recommend">
   <div class="fixed-wrapper" ref="fixedWrapper"  v-show="pullupSH()">
    <i class="icon-huo"></i>
    <h1 class="fixed-title" ref="fixedTitle">热门歌单</h1>
   </div>
   <scroll ref="scroll" class="recommend-content" 
      :data="songsList" 
      :listen-scroll="listenScroll" 
      
      :probe-type="probeType" 
      @scroll="_scroll"
     
      >

    <div class="wrapper">
      <div class="loading-wrapper">
        <loading v-show="pullDownRefresh" :title="loadingTitle"></loading>
      </div>      
     	<!-- 获取图片数据是异步的，拿到数据前slider组件已经被mounted，不能正确渲染，需要如下判断 -->
     	<div v-if="recommends.length" class="slider-wrapper">
     		<slider @sliderHeight="_sliderHeight">
     			<div v-for="item in recommends">
     				<a :href="item.linkUrl">
     					<img :src="item.picUrl"/>
     				</a>
     			</div>
     		</slider>
     	</div>
     	<div class="recommend-list">
        <i class="icon-huo"></i>
     		<h1 class="list-title">热门歌单</h1>       
     		<ul>
          <li v-for="item in songsList" class="item" @click="chooseItem(item)" ref="listGroup">
            <div class="icon">
              <img class="needsclick" width="60" v-lazy="item.imgurl">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.dissname"></h2>
              <p class="desc" v-html="item.creator.name"></p>
            </div>
          </li> 
        </ul>
     	</div>
    </div>
   
    <div class="loading-container" v-show="!songsList.length">
      <loading></loading>
    </div>
   </scroll>
   <div class="updateTip" ref="updateTip">{{updateTip}}</div>
   <router-view></router-view>
 </div>

</template>

<script>
import getRecommend from '@/api/recommend'
import getDesList from '@/api/deslist'
import getLyric from '@/api/lyric'
import {ERR_OK} from '@/api/config'
import Slider from '@/baseComponents/slider/slider'
import Scroll from '@/baseComponents/scroll/scroll'
import Loading from '@/baseComponents/loading/loading'
import {adaptBottomMixin} from '@/common/js/mixins'
import {mapMutations} from 'vuex'
const NO_DATA = "暂无数据，稍后再试吧"
const NEW_DATA = "刷新成功"
export default {	
  mixins: [adaptBottomMixin],
  data(){
    return{
      recommends: [],
      songsList: [],
      pullDownRefresh: true,
      pullDownRefreshThreshold: 90,
      pullDownRefreshStop: 40,
      listenScroll: true,
      probeType: 3,
      scrollY: -1,   
      loadingTitle: '下拉刷新',
      updateTip: "暂无数据，稍后再试吧",
      sliderHeight: 0
    }
  },
	created(){
		this._getRecommend()
    this._getDesList()
	},
  // computed: {
  //   pullDownRefreshObj() {
  //       return this.pullDownRefresh ? {
  //         threshold: parseInt(this.pullDownRefreshThreshold),
  //         stop: parseInt(this.pullDownRefreshStop)
  //       } : false
  //   }
  // },
	methods: {
		_getRecommend(){
			getRecommend().then( (res) => {
				if(res.code === ERR_OK){
					this.recommends = res.data.slider
          console.log(this.recommends)
				}
			} ).catch((err) => {
				console.log(err)
			})
		 },
    _getDesList(){
      getDesList().then( (res) => {
        if(res.code === ERR_OK){
          this.songsList = res.data.list
        }
      } ).catch( (err) => {
        console.log(err)
      } )
    },
    chooseItem(item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
      this.setRecommend(item)
    },
    ...mapMutations({
      setRecommend: 'SET_RECOMMEND'
    }),
    _scroll(pos){
      this.scrollY = pos.y
    },
    // _pullDownRefresh(){
    //   getDesList().then((res) => {
    //     if(res.code === ERR_OK){
    //       if( this.songsList === res.data.list ) { return }
    //       this.songsList = this.songsList.concat( res.data.list )
    //     }
    //   })
    //   //this.updateData()
    // },
    pullupSH(){
       if( this.scrollY <= - this.sliderHeight && this.$route.fullPath === '/recommend') {
          return true
        }else{
          return false
        }
    },
    // updateData(){
    //   const updateTip = this.$refs.updateTip
    //   updateTip.style.display = "block"
    //   setTimeout(() => {
    //     updateTip.style.display = "none"
    //   }, 1000);
    // },
    _sliderHeight(h){
      this.sliderHeight = h
    },
    // 重写mixins方法
    adaptBottom(playList){
        const bottom = this.playList.length > 0 ? '40px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll._refresh()
    },
	},
  watch: {
      scrollY(val,oldVal){
          if( val <= - this.sliderHeight ){
            this.$refs.fixedWrapper.style.display = `block`        
          }else{
            this.$refs.fixedWrapper.style.display = `none`
          }
          if( val > 80 ) {
            this.loadingTitle = "释放刷新"
          }else {
            this.loadingTitle = "下拉刷新"
          }
       }
    },
	components: {
		Slider,
    Scroll,
    Loading
	}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .fixed-wrapper
      position: fixed
      top: 86px
      left: 0
      width: 100%
      padding-left: 20px
      height: 60px
      line-height: 60px
      background: $color-background 
      z-index: 999
      text-align: center
      display: none
      transition: all 2s
      .icon-huo
        float:left
        color: red
        font-size:$font-size-large
      .fixed-title       
        font-size: $font-size-large
        color: $color-text-l
        margin-left: 2px
        float: left            
    .recommend-content
      width: 100%
      height: 100%
      overflow: hidden
      .loading-wrapper
        position: absolute
        top: -80px
        left: 50%
        transform: translate(-50%, 0)
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        position:relative
        .icon-huo
          float:left
          color: red
          font-size:$font-size-large
          height: 65px
          line-height: 65px
          margin-left: 20px
        .list-title
          height: 65px
          line-height: 65px
          padding-left: 40px
          font-size: $font-size-large
          color: $color-text-l
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
            border-radius: 50%
            // overflow: hidden
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text-l
              no-wrap()
            .desc
              
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
.updateTip
  position: fixed
  display: none
  width: 100%
  height: 30px
  line-height: 30px
  text-align: center
  background: $color-theme
  top: 88px
  left: 0
      
</style>