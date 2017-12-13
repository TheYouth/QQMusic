<template>
<div class="recommend" ref="recommend">
   <scroll class="recommend-content" :data="songsList" ref="scroll">
    <div>
   	<!-- 获取图片数据是异步的，拿到数据前slider组件已经被mounted，不能正确渲染，需要如下判断 -->
   	<div v-if="recommends.length" class="slider-wrapper">
   		<slider>
   			<div v-for="item in recommends">
   				<a :href="item.linkUrl">
   					<img :src="item.picUrl" />
   				</a>
   			</div>
   		</slider>
   	</div>
   	<div class="recommend-list">
   		<h1 class="list-title">热门歌单</h1>
   		<ul>
        <li v-for="item in songsList" class="item" @click="chooseItem(item)">
          <div class="icon">
            <img width="60" v-lazy="item.imgurl">
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
export default {	
  mixins: [adaptBottomMixin],
  data(){
    return{
      recommends: [],
      songsList: []
    }
  },
	created(){
		this._getRecommend()
    this._getDesList()
	},	
	methods: {
		_getRecommend(){
			getRecommend().then( (res) => {
				if(res.code === ERR_OK){
					this.recommends = res.data.slider
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
      console.log(item)
      this.$router.push({
        path: `/recommend/${item.id}`
      })
      this.setRecommend(item)
    },
    ...mapMutations({
      setRecommend: 'SET_RECOMMEND'
    }),
    // 重写mixins方法
    adaptBottom(playList){
        const bottom = this.playList.length > 0 ? '40px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll._refresh()
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
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium-x
          color: $color-theme
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

</style>