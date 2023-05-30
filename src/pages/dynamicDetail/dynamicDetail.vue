<template>
    <view class="main">
        <scroll-view scroll-y="true" class="scroll" @scrolltolower="reachBottom">
            <!--  内容-->
            <view class="dynamic-content">
                <dynamic :dynamic="dynamic" :topic-name="dynamic.topicName" :show-complete="true"
                         @tap-content="doComment('dynamic')"
                         @tap-user="userDetail(dynamic.userId)" />
            </view>
            <view class="comment-main">
                <view class="title">
                    <view class="title-text">
                        评论 · {{ commentNum }}
                    </view>
                </view>
                <!--   评论-->
                <view class="content">
                    <view class="content-item" v-for="(item,index) in commentList" :key="index">
                        <view class="left">
                            <image class="headImg" :src="item.headImgUrl" :draggable="false" mode="widthFix"
                                   @tap="userDetail" />
                        </view>
                        <view class="right">
                            <view class="content-title">
                                <view class="content-title-detail">
                                    <view class="content-title-user-name">
                                        <uni-section titleColor="#4d86e9" :title="item.nickName" titleFontSize="23px"
                                                     @tap="userDetail(item.fromUid)" />
                                    </view>
                                    <view class="tag" v-if="item.fromUid===dynamic.userId">楼主</view>
                                </view>
                                <view class="time">
                                    {{ item.publishingInterval }}
                                </view>
                            </view>
                            <view class="text">
                                <view class="article" @tap="doComment('comment',item)">
                                    {{ item.content }}
                                </view>
                            </view>
                            <view mt-2 class="imgs" v-if="item.pics.length>0">
                                <u-album :urls="item.pics" :row-count="item.pics.length==4?2:3" multipleSize="180" />
                            </view>
                            <!--  回复-->
                            <view class="recoment" v-if="item.recomment.length>0">
                                <view class="recomment-item" v-for="(reItem,index) in item.recomment" :key="index">
                                    <view class="recomment-left">
                                        <image class="recomment-headImg" :src="reItem.headImgUrl" :draggable="false"
                                               mode="widthFix" @tap="userDetail(reItem.fromUid)" />
                                    </view>
                                    <view class="recomment-right">
                                        <view class="recomment-title">
                                            <view class="recomment-title-bar">
                                                <view class="recomment-username">
                                                    <uni-section titleColor="#4d86e9" :title="reItem.fromUidName"
                                                                 titleFontSize="18px"
                                                                 @tap="userDetail(reItem.fromUid)" />
                                                </view>
                                                <view class="recomment-tag" v-if="reItem.fromUid===dynamic.userId">楼主
                                                </view>
                                                <view class="recomment-to" v-if="reItem.toUid">
                                                    <u-icon mr-0.5 name="play-right-fill" />
                                                    <view class="recomment-username">
                                                        <uni-section titleColor="#4d86e9" :title="reItem.toUidName"
                                                                     titleFontSize="18px"
                                                                     @tap="userDetail(reItem.toUid)" />
                                                    </view>
                                                    <view class="recomment-tag" v-if="reItem.toUid===dynamic.userId">
                                                        楼主
                                                    </view>
                                                </view>
                                            </view>
                                            <view class="recomment-time">
                                                {{ reItem.publishingInterval }}
                                            </view>
                                        </view>
                                        <view class="recomment-text" @tap="doComment('recomment',reItem)">
                                            {{ reItem.content }}
                                        </view>
                                        <view v-if="reItem.pics.length>0" class="recomment-imgs">
                                            <u-album :urls="reItem.pics" :row-count="reItem.pics.length===4?2:3"
                                                     multipleSize="140" />
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="bottomText">
                    <view class="text">
                        没有更多内容了~~
                    </view>
                </view>
            </view>
        </scroll-view>

        <view class="bottomBar">
            <view class="bottomBar-line">
                <u-line color="#C0C0C0FF" />
            </view>
            <view class="comment-area">
                <view class="textarea">
                    <textarea ref="textarea" :focus="isFocus" @blur="textareaBlur" :placeholder="placeholder"
                              v-model="commentContent" maxlength="-1"
                              auto-height />
                </view>

                <view class="btnBox" :style="{'min-width':btnWidth+'rpx'}">
                    <u-icon class="plusBtn" name="plus-circle-fill" size="43" @tap="clickPlusBtn" />
                    <u-icon v-if="commentContent.length>0" class="sendBtn"
                            name="arrow-upward" color="#fff" @tap="clickSendBtn"
                            size="35" />
                </view>
            </view>
            <view class="sendImgs" v-if="imgList.length>0">
                <scroll-view scroll-x="true" @touchmove.stop>
                    <uni-badge class="img-container" absolute="rightTop" text="x" type="info" @tap="cancelPic(index)"
                               v-for="(item,index) in imgList">
                        <view class="imgs">
                            <image :src="item" mode="aspectFill" @tap="previewImg(index)"></image>
                        </view>
                    </uni-badge>
                </scroll-view>
            </view>
        </view>
    </view>
</template>

<script>
import Dynamic from "@/components/dynamic/dynamic.vue";
import UAvatar from "@/uni_modules/uview-plus/components/u-avatar/u-avatar.vue";
import UniSection from "@/uni_modules/uni-section/components/uni-section/uni-section.vue";
import UAlbum from "@/uni_modules/uview-plus/components/u-album/u-album.vue";
import UIcon from "@/uni_modules/uview-plus/components/u-icon/u-icon.vue";
import UniDataPicker from "@/uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.vue";
import UniFilePicker from "@/uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue";
import UniBadge from "@/uni_modules/uni-badge/components/uni-badge/uni-badge.vue";
import { addCommentApi, addRecommentApi, getCommentListApi } from "@/api/comment";
import { useAuthStore } from "@/state/modules/auth";
import { uploadImgs } from "@/api/oss";

export default {
    components: { UniBadge, UniFilePicker, UniDataPicker, UIcon, UAlbum, UniSection, UAvatar, Dynamic },
    data() {
        return {
            isFocus: false,
            placeholder: "评论",
            imgList: [],
            isReq: false,
            dynamic: "",
            commentNum: 0,
            commentContent: "",
            curPage: 1,
            btnSytle: "font-size:10px",
            commentStyle: "background-color:#ccc",
            imageStyles: {
                width: 64,
                height: 64,
                border: {
                    color: "#ff5a5f",
                    width: 2,
                    style: "dashed",
                    radius: "2px"
                }
            },
            commentList: [
                {
                    id: "",
                    content: "一般来讲, 我们都必须务必慎重的考虑考虑. 那么, 从这个角度来看, 这种事实对本人来说意义重大, 相信对这个世界也是有一定意义的.爱迪生说过一句富有哲理的话，天才是百分之一的勤奋加百分之九十九的汗水。这句话把我们带到了一个新的维度去思考这个问题: 那么, 一般来说, 这是不可避免的. 我认为, 一般来讲, 我们都必须务必慎重的考虑考虑. 而这些并不是完全重要, 更加重要的问题是, 随机一段废话因",
                    fromUid: "admin",
                    nickName: "admin",
                    publishingInterval: "两小时前",
                    headImgUrl: "http://home.server1.fixnas.xyz:9000/libo/infoapp/315079017ae24eb2b4166c61a3b075ae.jpg",
                    pics: [
                        "http://home.server1.fixnas.xyz:9000/libo/infoapp/019dcc381b0043319dc6612d6cad121e.jpg",
                        "http://home.server1.fixnas.xyz:9000/libo/infoapp/d7aa0f2c3e144770a9e99631defc19c1.jpg",
                        "http://home.server1.fixnas.xyz:9000/libo/infoapp/4b5c04df4cee468faa35311ae1031713.jpg"
                    ],
                    recomment: [
                        {
                            id: "",
                            commentId: "",
                            content: "那就这样吧",
                            fromUid: "admin",
                            toUid: "sss",
                            headImgUrl: "http://home.server1.fixnas.xyz:9000/libo/infoapp/315079017ae24eb2b4166c61a3b075ae.jpg",
                            publishingInterval: "3秒前",
                            fromUidName: "admin",
                            toUidName: "sss",
                            pics: [
                                "http://home.server1.fixnas.xyz:9000/libo/infoapp/019dcc381b0043319dc6612d6cad121e.jpg",
                                "http://home.server1.fixnas.xyz:9000/libo/infoapp/d7aa0f2c3e144770a9e99631defc19c1.jpg",
                                "http://home.server1.fixnas.xyz:9000/libo/infoapp/4b5c04df4cee468faa35311ae1031713.jpg"
                            ]
                        },
                        {
                            id: "",
                            commentId: "",
                            content: "真的吗",
                            fromUid: "sss",
                            fromUidName: "sss",
                            toUid: "admin",
                            toUidName: "admin",
                            headImgUrl: "http://home.server1.fixnas.xyz:9000/libo/infoapp/315079017ae24eb2b4166c61a3b075ae.jpg",
                            publishingInterval: "6分钟前",
                            pics: [
                                "http://home.server1.fixnas.xyz:9000/libo/infoapp/019dcc381b0043319dc6612d6cad121e.jpg",
                                "http://home.server1.fixnas.xyz:9000/libo/infoapp/d7aa0f2c3e144770a9e99631defc19c1.jpg",
                                "http://home.server1.fixnas.xyz:9000/libo/infoapp/4b5c04df4cee468faa35311ae1031713.jpg"
                            ]
                        }
                    ]
                },
                {
                    id: "",
                    content: "一般来讲, 我们都必须务必慎重的考虑考虑. 那么, 从这个角度来看, 这种事实对本人来说意义重大, 相信对这个世界也是有一定意义的.爱迪生说过一句富有哲理的话，天才是百分之一的勤奋加百分之九十九的汗水。这句话把我们带到了一个新的维度去思考这个问题: 那么, 一般来说, 这是不可避免的. 我认为, 一般来讲, 我们都必须务必慎重的考虑考虑. 而这些并不是完全重要, 更加重要的问题是, 随机一段废话因",
                    fromUid: "admin",
                    nickName: "admin",
                    publishingInterval: "两小时前",
                    headImgUrl: "http://home.server1.fixnas.xyz:9000/libo/infoapp/315079017ae24eb2b4166c61a3b075ae.jpg",
                    pics: [
                        "http://home.server1.fixnas.xyz:9000/libo/infoapp/019dcc381b0043319dc6612d6cad121e.jpg",
                        "http://home.server1.fixnas.xyz:9000/libo/infoapp/d7aa0f2c3e144770a9e99631defc19c1.jpg",
                        "http://home.server1.fixnas.xyz:9000/libo/infoapp/4b5c04df4cee468faa35311ae1031713.jpg"
                    ],
                    recomment: [
                        {
                            id: "",
                            commentId: "",
                            content: "那就这样吧",
                            fromUid: "admin",
                            toUid: "sss",
                            headImgUrl: "http://home.server1.fixnas.xyz:9000/libo/infoapp/315079017ae24eb2b4166c61a3b075ae.jpg",
                            publishingInterval: "3秒前",
                            fromUidName: "admin",
                            toUidName: "sss",
                            pics: [
                                "http://home.server1.fixnas.xyz:9000/libo/infoapp/019dcc381b0043319dc6612d6cad121e.jpg",
                                "http://home.server1.fixnas.xyz:9000/libo/infoapp/d7aa0f2c3e144770a9e99631defc19c1.jpg",
                                "http://home.server1.fixnas.xyz:9000/libo/infoapp/4b5c04df4cee468faa35311ae1031713.jpg"
                            ]
                        },
                        {
                            id: "",
                            commentId: "",
                            content: "真的吗",
                            fromUid: "sss",
                            fromUidName: "sss",
                            toUid: "admin",
                            toUidName: "admin",
                            headImgUrl: "http://home.server1.fixnas.xyz:9000/libo/infoapp/315079017ae24eb2b4166c61a3b075ae.jpg",
                            publishingInterval: "6分钟前",
                            pics: [
                                "http://home.server1.fixnas.xyz:9000/libo/infoapp/019dcc381b0043319dc6612d6cad121e.jpg",
                                "http://home.server1.fixnas.xyz:9000/libo/infoapp/d7aa0f2c3e144770a9e99631defc19c1.jpg",
                                "http://home.server1.fixnas.xyz:9000/libo/infoapp/4b5c04df4cee468faa35311ae1031713.jpg"
                            ]
                        }
                    ]
                }
            ],
            btnWidth: "70rpx",
            replyType: -1,
            replyId: "",
            toUid: "",
            toCommentId: ""
        };
    },
    methods: {
        textareaBlur() {
            let me = this;
            me.isFocus = false;
            me.placeholder = "评论";
        },
        previewImg(index) {
            let me = this;
            // console.log(img);
            uni.previewImage({
                current: index,
                urls: me.imgList
            });
        },
        clickPlusBtn() {
            let me = this;
            console.log("更多");
            uni.chooseImage({
                extension: ["jpg", "png", "jpeg"],
                count: 40,
                success(res) {
                    console.log(res);
                    if (res.tempFilePaths.length > 9 || res.tempFilePaths.length + me.imgList > 9) {
                        uni.showToast({
                            title: "图片不能超过9张",
                            icon: "error",
                            duration: 2000
                        });
                    } else {
                        res.tempFilePaths.map(i => {
                            me.imgList.push(i);
                        });
                        console.log(me.imgList);
                    }

                }
            });
        },
        clickSendBtn() {
            console.log("发送");
            let me = this;
            let params = {
                dynamicId: me.dynamic.id,
                fromUid: useAuthStore().getId,
                content: me.commentContent
            };
            let upImgListName = [];
            uploadImgs(me.imgList).then(res => {
                console.log(res);
                res.map(i => {
                    upImgListName.push(i.fileName);
                });
                params["pics"] = upImgListName;
                console.log(params);
                if (me.replyType === -1) {
                    addCommentApi(params).then(res => {
                        uni.showToast({
                            title: "发送成功",
                            icon: "success"
                        });
                        uni.redirectTo({ url: "/pages/dynamicDetail/dynamicDetail?dynamic=" + JSON.stringify(me.dynamic) });
                    });
                } else {
                    params["commentId"] = me.commentId;
                    params["replyType"] = me.replyType;
                    params["replyId"] = me.replyId;
                    params["toUid"] = me.toUid;
                    console.log(params);
                    addRecommentApi(params).then(res => {
                        uni.showToast({
                            title: "回复成功",
                            icon: "success"
                        });
                        uni.redirectTo({ url: "/pages/dynamicDetail/dynamicDetail?dynamic=" + JSON.stringify(me.dynamic) });
                    });
                }
            });
            // me.imgList.map(img => {
            //     uni.uploadFile({//将本地资源上传到开发者服务器
            //         url: "/api/oss/uploadImg", //接口地址
            //         filePath: img,//图片地址
            //         name: "file",
            //         formData: {
            //             token: uni.getStorageSync("token")//加入token
            //         },
            //         success: (uploadFileRes) => {
            //             console.log(uploadFileRes);
            //             // let data = uploadFileRes.data
            //             // if(data.code ===200){
            //             //     this.my_avatar = data.data.url;//上传成功后返回的图片地址
            //             // }
            //             let parse = JSON.parse(uploadFileRes.data);
            //             upImgListName.push(parse.data.name)
            //         }
            //     });
            // });
            // params['pics']=upImgListName
            // addCommentApi(params).then(res=>{
            //     console.log(res);
            // })
            // console.log(params);
        },
        userDetail() {
            console.log("用户详情");
        },
        doComment(type, item) {
            let me = this;
            me.isFocus = true;
            if (type === "dynamic") {
                me.replyType = -1;
            } else if (type === "comment") {
                console.log('comment',item);
                me.placeholder = "回复" + item.nickName;
                me.replyType = 0;
                me.replyId = item.id;
                me.commentId = item.id;
                me.toUid = item.fromUid;
            } else if (type === "recomment") {
                console.log('recomment',item);
                me.placeholder = "回复" + item.fromUidName;
                me.replyType = 1;
                me.replyId = item.id;
                me.toUid = item.fromUid;
                me.commentId = item.commentId;
            }
        },
        cancelPic(pic) {
            console.log("取消图片", pic);
            let me = this;
            me.imgList.splice(pic, 1);
        },
        async getCommentList() {
            let me = this;
            let params = { pageNum: me.curPage, dynamicId: me.dynamic.id };
            console.log("dynamic", me.dynamic);
            let list = [];
            list = await getCommentListApi(params).then(res => {
                console.log(res);
                return res.data.list;
            }).catch(err => {
                console.log(err);
            });
            console.log(list);
            return list;
        },
        reachBottom() {
            let me = this;
            let tempList = [];
            if (!me.isReq) {
                me.isReq = true;
                me.curPage++;
                console.log("触底了");
                me.getCommentList().then(res => {
                    tempList = res;
                    if (tempList.length !== 0) {
                        me.commentList.concat(tempList);
                    } else {
                        me.curPage--;
                    }
                    setTimeout(() => {
                        me.isReq = false;
                    }, 5000);
                });
            }
        }
    },
    onLoad(option) {
        let me = this;
        let parse = JSON.parse(option.dynamic);
        me.dynamic = parse;
        me.commentList = [];
        me.getCommentList().then(res => {
            me.commentList = res;
            me.commentNum = me.commentList.length;
            me.commentList.map(comment => {
                me.commentNum += comment.recomment.length;
            });
        });
    },
    // activated() {
    //     let me = this;
    //     me.commentList = [];
    //     me.getCommentList().then(res => {
    //         me.commentList = res;
    //         me.commentNum = me.commentList.length;
    //         me.commentList.map(comment => {
    //             me.commentNum += comment.recomment.length;
    //         });
    //     });
    // },
    deactivated() {
        uni.closePreviewImage();
    },
    watch: {
        commentContent(newValue, oldValue) {
            if (newValue.length > 0) {
                this.btnWidth = 100;
            } else {
                this.btnWidth = 70;
            }
        }
    }
};
</script>

<style lang="scss">
page {
    height: 100%;
    background-color: #f1efef;
}

.main {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .scroll {
        flex: 1;
        overflow: auto;
        margin-top: -20rpx;

        .dynamic-content {
            background-color: #fff;
            padding-top: 20rpx;
        }
    }
}

.bottomText {
    color: #7e7e7e;
    display: flex;
    margin-top: 30rpx;
    margin-bottom: 10rpx;

    .text {
        margin: 0 auto;
        padding-bottom: 20rpx;
        align-items: center;
    }
}

.comment-main {
    display: flex;
    margin-top: -19rpx;
    flex: 1;
    background-color: #f1efef;
    //justify-content: space-around;
    flex-direction: column;
    //height: 100%;
    padding: 0 35rpx 0 15rpx;

    .title {
        margin-top: 20rpx;
        margin-bottom: 60rpx;
        display: flex;

        .title-text {
            margin-left: 15rpx;
            font-size: 20px;
        }
    }

    .content {
        .content-item {
            display: flex;
            //margin-bottom: 50rpx;
            padding-bottom: 45rpx;
            border-bottom: 1px solid #e8e7e7;

            .left {
                width: 16vw;
                height: 100%;

                .headImg {
                    border-radius: 100%;
                    width: 100rpx;
                }
            }

            .right {
                flex: 1;

                .content-title {
                    margin-top: -10rpx;
                    display: flex;
                    color: #fff;
                    flex-direction: column;

                    .content-title-detail {
                        display: flex;
                        align-items: center;

                        .content-title-user-name {
                            //margin-top: -10rpx;
                        }

                        .tag {
                            padding: 4rpx 5rpx;
                            //padding: 5rpx 5rpx 5rpx 5rpx;
                            font-size: 10px;
                            border-radius: 5px;
                            //margin-top: 5rpx;
                            margin-left: 8rpx;
                            //height: 42rpx;
                            display: flex;
                            background-color: $tag-color;
                        }
                    }

                    .time {
                        //margin-top: -10rpx;
                        font-size: 12px;
                        color: #b1b7ec;
                    }

                }

                .text {
                    display: inline;
                    line-height: 25px;

                    .tag {
                        display: inline;
                        background-color: $tag-color;
                        color: #fff;
                        padding: 0px 5px 1px 4px;
                        border-radius: 3px;
                        width: 100%;
                        max-height: 25px;
                    }

                    .article {
                        display: inline;
                    }
                }

                .imgs {

                }

                .recoment {
                    margin-top: 15rpx;
                    border-radius: 10px;
                    background-color: #fff;
                    padding: 35rpx 20rpx 20rpx 20rpx;
                    display: flex;
                    flex-direction: column;

                    .recomment-item {
                        display: flex;

                        .recomment-left {
                            .recomment-headImg {
                                border-radius: 100%;
                                width: 60rpx;
                            }
                        }

                        .recomment-right {
                            display: flex;
                            flex-direction: column;
                            margin-left: 15rpx;
                            padding-right: 10rpx;

                            .recomment-title {
                                display: flex;
                                justify-content: center;
                                flex-direction: column;
                                margin-top: -24rpx;

                                .recomment-title-bar {
                                    display: flex;
                                    align-items: center;

                                    .recomment-username {
                                        //margin-top: -10rpx;
                                    }

                                    .recomment-tag {
                                        padding: 4rpx 5rpx;
                                        display: flex;
                                        margin-left: 5rpx;
                                        font-size: 8px;
                                        color: #fff;
                                        border-radius: 5px;
                                        background-color: $tag-color;
                                    }

                                    .recomment-to {
                                        display: flex;
                                        margin-left: 10rpx;
                                        align-items: center;
                                    }
                                }

                                .recomment-time {
                                    margin-top: -10rpx;
                                    font-size: 10px;
                                    color: #b1b7ec;
                                }
                            }

                            .recomment-text {
                                margin: 15rpx 0;
                            }
                        }
                    }

                    .recomment-item:not(:last-child) {
                        margin-bottom: 50rpx;
                    }
                }

                .operations {
                }
            }

        }

        .content-item:not(:first-child) {
            margin-top: 40rpx;
        }
    }
}

.bottomBar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    background-color: $gray-back-color;

    .comment-area {
        padding: 15rpx;
        display: flex;

        .textarea {
            background-color: #dee0de;
            border-radius: 10rpx;
            border: 1px #ccc solid;
            display: inline-flex;
            flex: 1;
            max-height: 135rpx;
            overflow: auto;
            padding-left: 15rpx;
        }

        .btnBox {
            display: flex;
            align-items: center;
            justify-content: space-around;

            .plusBtn {
            }

            .sendBtn {
                border-radius: 100%;
                margin-bottom: 1rpx;
                background-color: #000000;
            }
        }
    }

    .sendImgs {
        //padding-top: 14rpx;
        white-space: nowrap;
        //padding-bottom: 15rpx;
        display: flex;
        justify-content: space-around;
        height: 135rpx;

        .img-container {
            margin-top: 15rpx;

            .imgs {
                display: inline-flex;
                //border-radius: 8px;
                //padding: 5rpx 8rpx 5rpx 8rpx;
                width: 100rpx;
                height: 100rpx;
                //margin-top: 10rpx;
                text-align: center;
                font-size: 30rpx;
                overflow: hidden;
                margin-left: 20rpx;
                margin-bottom: 15rpx;
                //background-color: #4d86e9;
            }
        }

        .img-container:last-child {
            margin-right: 30rpx;
        }


    }
}

</style>
