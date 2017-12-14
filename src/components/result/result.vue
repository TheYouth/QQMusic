<template>
  <div class="result">
    <ul class="result-list">
      <li class="result-item" v-for="item in result">
        <div class="icon">
          <i :class="showWhichIcon(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="showName(item)"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import getResult from '@/api/result'
import {ERR_OK} from '@/api/config'
import {switchToString} from '@/common/js/song'
export default {
  props: {
    searchTxt: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      defalut: true
    }
  },
  data(){
    return{
      page: 1,
      result: []
    }
  },
  methods: {
    _search(){
      getResult(this.searchTxt, this.page, this.showSinger).then((res) => {
        if( res.code === ERR_OK ){
          console.log(res.data)
          this.result = this._sortResult( res.data )
        }      
      })
    },
    _sortResult(data){
      let arr = []
      if( data.zhida && data.zhida.singerid ){
        arr.push( {...data.zhida, ...{type: 'singer'}} )
      }
      if( data.song ){
        arr = arr.concat( this._normalizeSongs(data.song.list) )
      }
      return arr
    },
    _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
    },
    showWhichIcon(item){
      if( item.zhida && item.zhida.type === 2 ){
        return "icon-icon"
      }else{
        return "icon-play"
      }
    },
    showName(item){
      if( item.zhida && item.zhida.type === 2 ){
        return item.singername
      }else{
        return `${item.songname}-${item.singer}`
      }
    }
  },
  watch: {
    searchTxt(){
      this._search()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .result
    height: 100%
    overflow: hidden
    .result-list
      padding: 0 30px
      .result-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>