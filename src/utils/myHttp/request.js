// const BASE_URL = 'http://192.168.10.254:18080/infoapp'
const BASE_URL = '/api'


const request = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.params || {},
			header:  {
				"Authorization": uni.getStorageSync("token")
			}
		}).then(response => {
			let data = response.data;
			if (data.code == 200) {
				resolve(data)
			} else if (data.code == 501) {
				
				uni.$u.toast('请重新登录')
				// uni.redirectTo({
				// 	url: '/pages/login/login'
				// })
				return
			} else {
				
				uni.$u.toast(data.errmsg)
				return
			}
		}).catch(err => {
			reject(err)
		})
	})
}

export default request