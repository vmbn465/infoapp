<template>
    <view v-if="scrollTop>400" class="backTop" :class="{'mescroll-fade-in':isShowToTop}" @click="toTopClick">
<!--        <text class="iconfont iconjiantou4" style="color: #fff;font-size:40rpx"></text>  &lt;!&ndash; 此处为iconfont图标，可根据自己项目设置 &ndash;&gt;-->
        <u-icon name="arrow-upward" size="50" color="#595959"/>
    </view>
</template>

<script>
import UIcon from "@/uni_modules/uview-plus/components/u-icon/u-icon.vue";

export default {
    name: "backTop",
    components: { UIcon },
    props: {
        id: {
            type: String,
            default: ''
        },
        scrollTop: {
            type: Number,
            default: 0
        },
        tab: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isShowToTop: true
        }
    },
    methods: {
        toTopClick() {
            this.isShowToTop = false; // 回到顶部按钮需要先隐藏,再执行回到顶部,避免闪动
            if (this.tab) {
                this.$emit('setScrollTop');
            } else {
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 200
                });
            }


        }
    },

}
</script>

<style>
.mescroll-lazy-in,
.mescroll-fade-in {
    -webkit-animation: mescrollFadeIn .3s ease forwards;
    animation: mescrollFadeIn .3s ease forwards;
}

.backTop {
    z-index: 999;
    position: fixed;
    right: 40rpx;
    bottom: 120rpx;
    /* #ifdef H5 */
    bottom: 180rpx;
    /* #endif */
    width: 70rpx;
    height: 70rpx;
    line-height: 100rpx;
    border-radius: 50%;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    background-color: rgba(0, 0, 0, 0.19);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>