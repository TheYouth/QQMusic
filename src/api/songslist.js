import jsonp from '@/common/js/jsonp'
import {commonParams, options} from './config'

export default function getSongsList(){

	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
	const data = Object.assign( {}, commonParams, {
		g_tk: 5381,
		platform: 'h5',
		uin: 0,
		needNewCode: 1,
		_: 1512564823240
	})
	return jsonp( url, data, options )
}