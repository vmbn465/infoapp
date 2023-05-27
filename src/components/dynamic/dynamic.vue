<template>
    <view class="content-main">
        <view class="contentItem">
            <view class="left" @tap="toUserDetail">
                <image class="headImg" :src="dynamic.headImgUrl" :draggable="false" mode="widthFix"></image>
            </view>
            <view class="right">
                <!-- <view class="title">wwwww</view> -->
                <view class="title">
                    <uni-section titleColor="#4d86e9" :title="dynamic.nickName" titleFontSize="23px"
                                 padding="0px" @tap="toUserDetail"></uni-section>
                    <view class="tagList">
                        <view class="tag" v-if="dynamic.isMaster==1?true:false">
                            精
                        </view>
                        <view class="tag" v-if="dynamic.isTop==1?true:false">
                            置顶
                        </view>
                        <view class="tag" v-if="dynamic.hot>6">
                            热
                        </view>
                    </view>

                </view>
                <view class="text" :class="[showComplete===true?'':'hideText']" @tap="toContentDetail(dynamic)">
                    <view class="tag">{{ topicName }}</view>
                    <view class="article" >
<!--                        <u-text :text="dynamic.content" size="30"></u-text>-->
                        {{dynamic.content}}
                    </view>
                </view>
                <view mt-2 class="imgs" v-if="dynamic.pics.length>0">
                    <u-album :urls="dynamic.pics" :row-count="dynamic.pics.length==4?2:3" multipleSize="180"></u-album>
                </view>
                <view class="time">{{ dynamic.publishingInterval }}</view>
                <view class="operations"></view>
            </view>
        </view>
        <u-line></u-line>
    </view>
</template>

<script>
import UText from "@/uni_modules/uview-plus/components/u-text/u-text.vue";

export default {
    name: "dynamic",
    components: { UText },
    props: ["dynamic", "topicName", "showComplete"],
    emits: ["tapContent", "tapUser"],
    data() {
        return {
            // dynamic: {},
            // topicName:'全部'

        };
    },
    methods: {
        toContentDetail(dynamic) {
            // console.log('内容详情');
            this.$emit("tapContent", JSON.stringify(dynamic));
            // uni.navigateTo({url:'/pages/dynamicDetail/dynamicDetail?dynamic='+JSON.stringify(dynamic)})
        },
        toUserDetail() {
            // console.log('用户详情');
            this.$emit("tapUser");
        }
    }
};
</script>

<style scoped lang="scss">

.content-main{
    display:flex;
    flex-direction: column;
    margin:20rpx 0 20rpx 0;
    .contentItem {
        display: flex;
        flex: 1;
        flex-direction: row;
        margin-bottom: 5rpx;

        .left {
            width: 18vw;
            height: 100%;

            .headImg {
                margin: 15rpx 0 0 15rpx;
                border-radius: 100%;
                width: 100rpx;
            }
        }

        .right {
            flex: 1;
            padding-right: 20rpx;

            .title {
                display: flex;
                color: #fff;

                .tagList {
                    margin-top: 10.5rpx;
                    margin-left: 10rpx;

                    .tag {
                        display: inline;
                        font-size: 14px;
                        background-color: #f10606;
                        max-height: 19px;
                        padding: 0px 10px 1px 10px;
                        border-radius: 3px;
                    }

                    .tag:not(:first-child) {
                        margin-left: 9rpx;
                    }
                }
            }
            .hideText{
                display: inline-block;
                //line-height: 25px;
                max-height:300rpx;
                overflow:hidden;
                text-overflow:ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 5;
            }
            .text {
                //display: inline-block;
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

            .time {
                color: #8b8b8b;
                padding: 10rpx 0rpx 10rpx 0rpx;
            }

            .operations {
            }
        }

        //border-bottom: 3px #eaeaea solid;
    }

    .contentItem:not(:first-child) {
        margin-top: 5rpx;
    }

}


</style>