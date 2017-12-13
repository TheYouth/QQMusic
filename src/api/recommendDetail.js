import axios from 'axios'
import {commonParams, options} from './config'

export default function getDesDetail(disstid){

	const url = '/api/getDesDetail'
	// 把公共参数和其他参数合并
	const data = Object.assign( {}, commonParams, {
		type:1,
		json:1,
		utf8:1,
		onlysong:0,
		disstid:disstid,
		format:'json',
		g_tk:5381,
		loginUin:0,
		hostUin:0,
		platform:'yqq',
		needNewCode:0
	})
	return axios.get( url, {
		params: data
	} ).then( (res) => {
		return Promise.resolve( res.data )
	} )
}