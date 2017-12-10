export default class Song {
	constructor({id, mid, singer, name, album, duration, image, url}){
		this.id = id
		this.name = name
		this.singer = singer
		this.album = album
		this.duration = duration
		this.image = image
		this.url = url		
	}
}

export function createSong( musicData ){
	return new Song({
		id: musicData.songid,
		mid: musicData.songmid,
		singer: switchToString(musicData.singer),
		name: musicData.songname,
		album: musicData.albumname,
		duration: musicData.interval, //时长
		image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`, //专辑图片
		url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`  //播放源
	})
}
// musicData里面singer的数据结构是数组，我要的数据结构是字符串，并且多个歌手用'/'拼接
function switchToString(singer) {
	let ret = []
	if(!singer){
		return ''
	}
	singer.forEach((item) => {
		ret.push( item.name )
	})
	return ret.join( '/' )

}
