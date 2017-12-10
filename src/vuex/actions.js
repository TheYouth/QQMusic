import * as types from './mutations-types'

// 点击歌曲播放这一动作涉及到提交多个mutations，因此把他们集合到一个actions里面进行管理
export function toPlay( {commit,state}, {list,index} ) {
	commit( types.SET_PLAYING_STATE, true )
    commit( types.SET_FULL_SCREEN, true )
    commit( types.SET_CURRENT_INDEX, index )
    commit( types.SET_PLAYLIST, list )
    commit( types.SET_SEQUENCE_LIST, list )   
}