import request from "@/utils/myHttp/request";

export function uploadImgs(pathList) {
  let returnList = [];
  return new Promise((resolve, reject) => {
    let len = pathList.length;	// 获取图片地址的数量
    let timer = null; // 创建变量，用来创建定时器
    for (let i = 0; i < pathList.length; i++) {
      uni.uploadFile({
        url: "/api/oss/uploadImg",
        filePath: pathList[i],
        name: "file",
        formData: {
          token: uni.getStorageSync("token")//加入token
        },
        success: (uploadFileRes) => {
          console.log(uploadFileRes);
          let parse = JSON.parse(uploadFileRes.data);
          if (parse.code === 200) {
            returnList.push({ fileName: parse.data.fileName, fileUrl: parse.data.fileUrl });
          }
          else{
            reject(parse.msg)
          }
        },
        complete: (X) => {
          console.log("完成..: " + len);
          len--;	// 不论success还是fail，都把len-1
        }
      });
    }
    // 关键部分
    // 通过此部分来延续方法的时长，待到异步的回调执行完毕后则关闭
    // 以防万一，建议设定一个阈值，防止出现意外导致无限循环
    timer = setInterval(() => {
      // console.log(len);
      if (!len || len < -5000) {	// 只要len结束，将定时器清除
        // console.log("同步结束");
        resolve(returnList);
        clearInterval(timer);	// 上传操作完成，消除阻塞
      }
    }, 1);	// 这个参数一定要写，如果不写在IOS端会报错导致同步失败
  }, 50);
}