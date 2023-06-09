import requset from '../../utils/myHttp/request.js'

export function getCommentListApi(data){
  return requset({
    url:'/comment/list',
    method:'POST',
    params:data,
  })
}
export function addCommentApi(data){
  return requset({
    url:'/comment/save',
    method:'POST',
    params:data,
  })
}
export function addRecommentApi(data){
  return requset({
    url:'/recomment/save',
    method:'POST',
    params:data,
  })
}

export function getAllRecommentApi(data){
  return requset({
    url:'/recomment/allRecomment/'+data,
    method:'POST',
    // params:data,
  })
}