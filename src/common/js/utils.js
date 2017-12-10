// 返回随机整数
export function random_digit(min, max) {
	return Math.floor( Math.random() * ( max - min + 1 ) + min )
} 
// 数组洗牌
export function shuffle(arr) {
	for (let i = 0; i < arr.length - 1; i++) {
		let j = random_digit( 0, i )
		let mid = arr[i]
		arr[i] = arr[j]
		arr[j] = mid
	}
	return arr
}