export function addClass( el, className ){
	if(hasClass( el, className )) return
	// 如果没有，那么添加
	let newClass = el.className.split(' ')
	newClass.push(className)
	el.className = newClass.join(' ')
}
// 判断是否有这个className
export function hasClass( el, className ){
	let reg = new RegExp( '(^|\\s)' + className + '(\\s|$)' )
	return reg.test(el.className)
}

