<template>
    <view>
        <u--textarea height="140"
                     class="textarea"
                     v-model="content"
                     placeholder="请输入内容"
                     :maxlength="-1"
                     border="bottom"
                     mb-2 />
        <view class="imageList" ml-2>
            <u-upload :fileList="imgList" @afterRead="afterRead" @delete="deletePic" multiple :maxCount="9"
                      :previewFullImage="true" imageMode="center" width="228" height="228" />
        </view>
        <view class="topic">
            <picker @change="bindPickerChange" :value="topicId" :range="topicList" range-key="topicName">
                <view class="uni-input">{{ topicName }}</view>
            </picker>
        </view>
        <view ml-5 mr-5 mt-4 class="publishBtn">
            <button type="primary" @tap="publish">发布</button>
        </view>
    </view>
</template>

<script>
import {
    useRouter
} from "uni-mini-router";
import { useAuthStore } from "@/state/modules/auth";
import UButton from "@/uni_modules/uview-plus/components/u-button/u-button.vue";
import UPicker from "@/uni_modules/uview-plus/components/u-picker/u-picker.vue";
import UniDataPicker from "@/uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.vue";
import { router } from "@/router";
import UniFilePicker from "@/uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue";
import UUpload from "@/uni_modules/uview-plus/components/u-upload/u-upload.vue";

export default {
    components: { UUpload, UniFilePicker, UniDataPicker, UPicker, UButton },
    data() {
        return {
            content: "",
            imgList: [],
            topicId: "",
            topicName: "选择主题",
            topicList: [],
            showTopicList: false
        };
    },
    methods: {
        deletePic(e) {
            let delFileList = [], me = this;
            delFileList.push(e.file.name);
            console.log(delFileList);
            uni.showModal({
                content: "是否删除",
                success: res => {
                    if (res.confirm) {
                        uni.request({
                            url: "/api/dynamic/cancel",
                            method: "POST",
                            data: {
                                delFileList: delFileList
                            }
                        });
                        for (let i = 0; i < me.imgList.length; ++i) {
                            if (me.imgList[i].name === e.file.name) {
                                me.imgList.splice(i, 1);
                                break;
                            }
                        }
                        console.log("确定");
                    } else {
                        console.log("取消");
                    }
                }
            });

        },
        bindPickerChange(e) {
            let me = this;
            let index = e.detail.value;
            me.topicId = me.topicList[index].id;
            me.topicName = "#" + me.topicList[index].topicName;
        },
        publish() {
            let me = this;
            let params = {
                content: me.content,
                pics: me.imgList,
                userId: useAuthStore().getId,
                topicId: me.topicId
            };
            console.log(params);
            if(me.topicId===""){
                uni.showToast({
                    title:'请选择你要发布的主题',
                    icon:'error'
                })
                return
            }
            else if(me.content===""){
                uni.showToast({
                    title:'内容不能为空',
                    icon:'error'
                })
                return
            }
            uni.request({
                url: "/api/dynamic/saveDynamic",
                method: "POST",
                data: params,
                success: (res) => {
                    if (res.data.code === 200) {
                        uni.showToast({
                            title: "发布成功",
                            icon: "success"
                        });
                        uni.switchTab({
                            url: "/pages/index/index"
                        });
                    } else {
                        uni.showToast({
                            title: "发布失败",
                            icon: "none"
                        });
                    }
                }
            });
        },
        getTopicList() {
            let me = this;
            uni.request({
                url: "/api/topic/list",
                method: "POST",
                data: {},
                success: (res) => {
                    me.topicList = res.data.data.list;
                    console.log(res.data);
                    // me.topicList.unshift({id:undefined,topicName:"全部",weight:0})
                }
            });
        },
        async afterRead(event) {
            let me = this;
            // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
            let lists = [].concat(event.file);
            let fileListLen = me.imgList.length;
            lists.map((item) => {
                me.imgList.push({
                    ...item,
                    status: "uploading",
                    message: "上传中"
                });
            });
            for (let i = 0; i < lists.length; i++) {
                const result = await this.uploadFilePromise(lists[i].url);
                let res = JSON.parse(result);
                console.log(res);
                let item = me.imgList[fileListLen];
                me.imgList.splice(fileListLen, 1, Object.assign(item, {
                    status: "success",
                    message: "",
                    url: res.data.fileUrl,
                    name: res.data.fileName
                }));
                fileListLen++;
            }
        },
        uploadFilePromise(url) {
            return new Promise((resolve, reject) => {
                let a = uni.uploadFile({
                    url: "/api/oss/uploadImg",
                    filePath: url,
                    name: "file",
                    success: (res) => {
                        console.log(res);
                        // setTimeout(() => {
                        resolve(res.data);
                        // }, 1000)
                    }
                });
            });
        }
    },
    onLoad(option) {
        let me = this;
        if (option.hasOwnProperty("e")) {
            me.content = JSON.parse(option.content);
            me.imgList = JSON.parse(option.imgList);
            let delFileList = me.imgList.map(item => {
                return item.name;
            });
            console.log(delFileList);
            uni.showModal({
                content: "退出将不会保存你的内容",
                success: res => {
                    if (res.confirm) {
                        uni.request({
                            url: "/api/dynamic/cancel",
                            method: "POST",
                            data: {
                                delFileList: delFileList
                            }
                        });
                        uni.switchTab({
                            url: "/pages/index/index"
                        });
                    }
                }
            });
        }
    },
    mounted() {
        let me = this;
        me.getTopicList();
    },
    deactivated() {
        let me = this;
        if (me.content == "" && JSON.stringify(me.imgList) == "[]") {
        } else {
            useRouter().push({
                path: "pages/addDynamic/index",
                query: {
                    e: "1111",
                    content: encodeURIComponent(JSON.stringify(me.content)),
                    imgList: encodeURIComponent(JSON.stringify(me.imgList))
                }
            });
        }
    }
};
</script>

<style lang="scss">
.textarea {
    margin: 0rpx 10rpx 0rpx 10rpx
}

.topic {
    display: inline-flex;
    margin-top: 3rpx;
    margin-left: 20rpx;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 3rpx 15rpx 3rpx 15rpx;
    background-color: #f5f5f5;
    //.select {
    //    height: 50rpx;
    //    //padding: 0 3rpx 0 3rpx;
    //    font-size: 10rpx;
    //}
    //.btn:not(:first-child){
    //    margin-left: 15rpx;
    //}

}

.imageList {
    @include flex;
    align-items: flex-start;
    margin-top: 20rpx;

    &__content {
        margin-left: 10px;
        flex: 1;
    }
}

.publishBtn {
}
</style>