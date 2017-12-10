<template>
<div class="recommend">
   <scroll class="recommend-content" :data="songsList">
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
        <li v-for="item in songsList" class="item">
          <div class="icon">
            <img width="60" v-lazy="item.picUrl">
          </div>
          <div class="text">
            <h2 class="name" v-html="item.songListAuthor"></h2>
            <p class="desc" v-html="item.songListDesc"></p>
          </div>
        </li> 
      </ul>
   	</div>
    </div>

    <div class="loading-container" v-show="!songsList.length">
      <loading></loading>
    </div>
   </scroll>
 </div>
</template>

<script>
import getRecommend from '@/api/recommend'
import getSongsList from '@/api/songslist'
import {ERR_OK} from '@/api/config'
import Slider from '@/baseComponents/slider/slider'
import Scroll from '@/baseComponents/scroll/scroll'
import Loading from '@/baseComponents/loading/loading'
export default {	
  data(){
    return{
      recommends: [],
      songsList: []
    }
  },
	created(){
		this._getRecommend()
    setTimeout(() => {
      this._getSongsList()
    }, 1000);
    // this._getSongsList()
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
    _getSongsList(){
      getSongsList().then( (res) => {
        if(res.code === ERR_OK){
          this.songsList = res.data.songList
        }
      } ).catch( (err) => {
        console.log(err)
      } )
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
          font-size: $font-size-medium
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
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)

</style>