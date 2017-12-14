import jsonp from '@/common/js/jsonp'
import {commonParams, options} from './config'

export default function getResult(searchTxt, page, showSinger){

	const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
	// 把公共参数和其他参数合并
	const data = Object.assign( {}, commonParams, {
		g_tk:5381,
		platform:'h5',
		needNewCode:1,
		w: searchTxt,
		zhidaqu: 1,
		catZhida: showSinger ? 1 : 0,
		t:0,
		flag:1,
		ie:'utf-8',
		sem:1,
		aggr:0,
		perpage:20,
		n:20,
		p: page,
		remoteplace: 'txt.mqq.all'
	})
	return jsonp( url, data, options )
}