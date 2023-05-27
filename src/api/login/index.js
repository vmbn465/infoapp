import requset from '../../utils/myHttp/request.js'

export function test(data){
	return requset({
		url:'/topic/list',
		method:'POST',
		params:data,
	})
}