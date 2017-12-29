/**
 *制作一个vue的localstorage插件
 */

let store = {
	set(key, value) {
		localStorage.setItem(key, JSON.stringify(value))
	},
	get(key) {
		return JSON.parse(localStorage.getItem(key)) || {}
	}
}
let localstorage = {
	install: function(vm) {
		vm.prototype.$local = store
	}
}
export default localstorage