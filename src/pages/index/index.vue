<script>

import Dynamic from "@/components/dynamic/dynamic.vue";
import { useNavigateStore } from "@/state/modules/navigate";
import BackTop from "@/components/back-top/back-top.vue";

export default {
    components: { BackTop, Dynamic },
    data() {
        return {
            refresh: false,
            swiperUrlList: ["http://home.server1.fixnas.xyz:9000/zhizhu/h5app/034f30729b684f4eb7381af2a24c83dd.jpg",
                "http://home.server1.fixnas.xyz:9000/zhizhu/h5app/10ad5fc1a18d416dbcc3fa9963e2f738.jpg",
                "http://home.server1.fixnas.xyz:9000/zhizhu/h5app/1679334110.jpg"
            ],
            dotStyle: {
                backgroundColor: "rgba(0, 0, 0, .3)",
                border: "1px rgba(0, 0, 0, .3) solid",
                color: "#fff",
                selectedBackgroundColor: "rgba(0, 0, 0, .9)",
                selectedBorder: "1px rgba(0, 0, 0, .9) solid"
            },
            current: 0,
            curTopic: 0,
            curTopicId: undefined,
            curTopicName: "全部",
            isMoreContent: true,
            topicList: ["全部", "新鲜事", "日常投稿", "求助问答", "二手转卖", "讲座"],
            fixed: false,
            curPage: 1,
            offsetTop: 0,
            dynamicList1: [
                {
                    nickName: "崔添池",
                    headImgUrl: "http://home.server1.fixnas.xyz:9000/zhizhu/h5app/201541975b0d40b48190d084f6cdaebb.jpg",
                    content: "成略在胸，良计速出。\
							吾有良略在怀，必为阿瞒所需。成略在胸，良计速出。\
							吾有良略在怀，必为阿瞒所需。哼，目光所及，短寸之间。\
							狭目之见，只能窥底。阿瞒，没有我，你得不到冀州啊！\
							狭目之见，只能窥底。阿瞒，没有我，你得不到冀州啊！\
							狭目之见，只能窥底。阿瞒，没有我，你得不到冀州啊！\
							狭目之见，只能窥底。阿瞒，没有我，你得不到冀州啊！",
                    publishingInterval: "5分钟前",
                    pics: [
                        "http://home.server1.fixnas.xyz:9000/zhizhu/h5app/10ad5fc1a18d416dbcc3fa9963e2f738.jpg",
                        "http://home.server1.fixnas.xyz:9000/zhizhu/h5app/10ad5fc1a18d416dbcc3fa9963e2f738.jpg",
                        "http://home.server1.fixnas.xyz:9000/zhizhu/h5app/10ad5fc1a18d416dbcc3fa9963e2f738.jpg",
                        "http://home.server1.fixnas.xyz:9000/zhizhu/h5app/10ad5fc1a18d416dbcc3fa9963e2f738.jpg"
                    ]
                },
                {
                    nickName: "赵军",
                    headImgUrl: "http://home.server1.fixnas.xyz:9000/zhizhu/h5app/201541975b0d40b48190d084f6cdaebb.jpg",
                    publishingInterval: "3小时前",
                    content: "成略在胸，良计速出。\
							吾有良略在怀，必为阿瞒所需。成略在胸，良计速出。\
							吾有良略在怀，必为阿瞒所需。哼，目光所及，短寸之间。\
							狭目之见，只能窥底。阿瞒，没有我，你得不到冀州啊！\
							狭目之见，只能窥底。阿瞒，没有我，你得不到冀州啊！\
							狭目之见，只能窥底。阿瞒，没有我，你得不到冀州啊！\
							狭目之见，只能窥底。阿瞒，没有我，你得不到冀州啊！",
                    pics: [
                        "http://home.server1.fixnas.xyz:9000/zhizhu/h5app/10ad5fc1a18d416dbcc3fa9963e2f738.jpg",
                        "http://home.server1.fixnas.xyz:9000/zhizhu/h5app/10ad5fc1a18d416dbcc3fa9963e2f738.jpg",
                        "http://home.server1.fixnas.xyz:9000/zhizhu/h5app/10ad5fc1a18d416dbcc3fa9963e2f738.jpg"
                    ]
                }],
            dynamicList:[],
            scrollLeft: 0,
            old: {
                scrollLeft: 0
            },
            scrollTopCount:0
        };
    },
    onPullDownRefresh() {
        let me = this;
        console.log("监听下拉刷新");
        // setTimeout(() => {
        // 	// console.log(me.dynamicList[0]);
        // 	uni.stopPullDownRefresh()
        // }, 1000)
        me.curPage = 1;
        me.isMoreContent = true;
        me.dynamicList = [];
        me.getDynamicList(me.curTopicId).then(res => {
            me.dynamicList = res;
            uni.stopPullDownRefresh();
            console.log("停止刷新");
        });
    },
    methods: {
        changeSwiper(e) {
            this.current = e.detail.current;
        },
        topicChange(index) {
            let me = this;
            me.curTopic = index;
            me.curPage = 1;
            me.dynamicList = [];
            me.curTopicId = me.topicList[me.curTopic].id;
            me.curTopicName = me.topicList[me.curTopic].topicName;
            uni.startPullDownRefresh();
            if (index == me.topicList.length - 1 || index == me.topicList.length - 2) {
                me.scrollLeft = this.old.scrollLeft;
                me.$nextTick(() => {
                    setTimeout(() => {
                        me.scrollLeft = 500;
                    }, 300);
                });
            }
        },
        async getDynamicList(topicId) {
            return await
              this.getDynamicListApi(topicId);
        },
        getDynamicListApi(topicId) {
            let me = this;
            // console.log("topicId",topicId);
            return new Promise((resolve, reject) => {
                uni.request({
                    url: "/api/dynamic/list",
                    method: "POST",
                    data: {
                        topicId: topicId,
                        pageNum: me.curPage
                    },
                    success: res => {
                        let dynamicList = res.data.data.list;
                        dynamicList.forEach(dynamic => {
                            let pics = [];
                            dynamic.pics.forEach(pic => {
                                pics.push(pic.url);
                            });
                            dynamic.pics = pics;
                        });
                        console.log(dynamicList);
                        resolve(dynamicList);
                    },
                    fail: err => {
                        reject(err);
                    }
                });
            });
        },
        initHeight() {
            // 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离 (被卷曲的高度)
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            //如果被卷曲的高度大于吸顶元素到顶端位置 的距离
            this.fixed = scrollTop > this.offsetTop;
        },
        getTopicList() {
            let me = this;
            uni.request({
                url: "/api/topic/list",
                method: "POST",
                data: {},
                success: (res) => {
                    me.topicList = res.data.data.list;
                    me.topicList.unshift({ id: undefined, topicName: "全部", weight: 0 });
                }
            });
        },
        scroll(e) {
            this.old.scrollLeft = e.detail.scrollLeft;
        },
        toContentDetail(dynamic) {
            let me = this;
            console.log("内容详情");
            dynamic = JSON.parse(dynamic);
            dynamic.topicId = me.curTopicId;
            dynamic.topicName = me.curTopicName;
            uni.navigateTo({ url: "/pages/dynamicDetail/dynamicDetail?dynamic=" + JSON.stringify(dynamic) });
        },
        toUserDetail() {
            console.log("用户详情");
        }
    },
    onPageScroll(e) {
        this.scrollTopCount = e.scrollTop;
    },
    onLoad(option) {
        console.log(option);
        console.log("onLoad");
        uni.startPullDownRefresh();
    },
    onReachBottom() {
        let me = this;
        if (me.isMoreContent) {
            console.log("触底刷新");
            me.curPage++;
            me.getDynamicList(me.curTopicId).then(res => {
                me.dynamicList = me.dynamicList.concat(res);
                if (res.length === 0) {
                    me.isMoreContent = false;
                }
            });
        }

        // if(this.listQuery.pageNum * this.listQuery.pageSize > this.total){
        //     this.listQuery.pageNum ++
        //     this.getList()
        // }
    },
    mounted() {
        let me = this;
        console.log("onMounted");
        window.addEventListener("scroll", me.initHeight);
        me.$nextTick(() => {
            //获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置
            me.offsetTop = document.querySelector("#boxFixed")?.offsetTop;
        });
        me.getTopicList();
    },
    activated(e) {
        let me = this;
        let navStore = useNavigateStore();
        let reload = navStore.reload;
        console.log(reload);
        window.addEventListener("scroll", me.initHeight);
        console.log(e);
        console.log("jihuole");
        if (reload) {
            me.$nextTick(() => {
                //获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置
                me.offsetTop = document.querySelector("#boxFixed").offsetTop;
            });
            me.getTopicList();
            navStore.reload=false
            uni.startPullDownRefresh();
        }
    },
    deactivated() {
        window.removeEventListener("scroll", this.handleScroll);
    }
};
</script>
<template>
    <view>
        <!-- 轮播图 -->
        <view>
            <uni-swiper-dot class="uni-swiper-dot-box" :dots-styles="dotStyle" mode="default" :info="swiperUrlList"
                            :current="current">
                <swiper style="height: 300rpx;" @change="changeSwiper" circular="true">
                    <swiper-item v-for="(item,index) in swiperUrlList" class="swiper-item" :item-id="index.toString()"
                                 :key="index">
                        <image :src="item" mode="aspectFit"></image>
                    </swiper-item>
                </swiper>
            </uni-swiper-dot>
        </view>
        <view id="boxFixed"></view>
        <!-- 主题 -->
        <view class="topicScroll" :class={fixed:fixed}>
            <scroll-view :scroll-left="scrollLeft" scroll-x="true" @touchmove.stop @scroll="scroll">
                <view :class="{topicActive: index===curTopic}" @click="topicChange(index)" class="topicScrollItem"
                      :id="index" v-for="(item ,index) in topicList" :key="index">
                    {{ item.topicName }}
                </view>
            </scroll-view>
        </view>
        <view class="content">
            <dynamic v-for="(item,index) in dynamicList" :dynamic="item" :topic-name="curTopicName" :key="index"
                     @tap-user="toUserDetail" @tap-content="toContentDetail" />
        </view>
        <view class="bottomText">
            <view class="text">没有更多内容了~~</view>
        </view>
        <back-top :scrollTop="scrollTopCount"></back-top>
    </view>
</template>
<style lang="scss">
.content {
    display: flex;
    flex-direction: column;
    padding: 20rpx 5rpx 30rpx 5rpx;
}

.topicScroll {
    //margin-top: 14rpx;
    padding-top: 14rpx;
    //width: 100%;
    box-shadow: 0px 3px 5px #eaeaea;
    white-space: nowrap;
    //height: 60rpx;
    padding-bottom: 15rpx;
    display: flex;
    justify-content: space-around;

    .topicScrollItem {
        display: inline-flex;
        border-radius: 8px;
        padding: 5rpx 8rpx 5rpx 8rpx;
        text-align: center;
        font-size: 30rpx;
        overflow: hidden;
        margin-right: 20rpx;
    }

    .topicScrollItem:first-child {
        margin-left: 20rpx;
    }

    .topicActive {
        background-color: #efe8e8;
        font-size: 36rpx;
        font-weight: bold;
        transition-duration: .5s;
    }
}

.bottomText {
    color: #7e7e7e;
    display: flex;
    margin-bottom: 10rpx;

    .text {
        margin: 0 auto;
        //align-items: center;
    }
}

.swiper-item {
    display: block;
    height: 300rpx;
    line-height: 300rpx;
    text-align: center;
}

.fixed {
    // width: 100%;
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: #fff;
}
</style>