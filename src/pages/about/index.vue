<script lang="ts" setup>
import { onActivated, onDeactivated, onMounted, ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import BasicButton from "@/components/BasicButton/index.vue";
import { useAuthStore } from "@/state/modules/auth";
import { useRouter } from "uni-mini-router";
import UAvatar from "@/uni_modules/uview-plus/components/u-avatar/u-avatar.vue";
import { useUserStore } from "@/state/modules/user";
import {test} from "@/api/login/index.js";

const authStore = useAuthStore();
const isLogin = ref(false);
const router = useRouter();
const userStore = useUserStore();
// const headImgUrl = ref('/static/images/avatar.png');
const headImgUrl = ref("http://home.server1.fixnas.xyz:9000/zhizhu/h5app/10ad5fc1a18d416dbcc3fa9963e2f738.jpg");
const nickName = ref("未登录");
onShow(() => {
    isLogin.value = authStore.isLogin;
    let code = getCode();
    let token = authStore.getToken;
    console.log(token);
    if (token != undefined) {
        console.log("已登陆");
        console.log(authStore.getToken);
        console.log(authStore.getHeadImgUrl);
        console.log(authStore.getOpenId);
        console.log(authStore.getNickName);

        headImgUrl.value = authStore.getHeadImgUrl;
        nickName.value = authStore.getNickName;
    } else if (code != null && code !== "" && code != undefined) {
        console.log("登录中", code);
        uni.request({
            url: "/api/user/wxlogin",
            data: {
                code: code
            },
            success: (res) => {
                console.log(res);
                // let tempUserInfo = {};
                // tempUserInfo["nickName"] = res.data.data.nickname;
                // tempUserInfo["headImgUrl"] = res.data.data.headimgurl;
                // console.log(tempUserInfo);

                authStore.setUserInfo({
                    openId: res.data.data.openid,
                    nickName: res.data.data.nickname,
                    headImgUrl: res.data.data.headimgurl,
                    id: res.data.data.id
                });
                // authStore.setHeadImgUrl(res.data.data.headimgurl);
                // authStore.setNickName(res.data.data.nickname);
                // authStore.setOpenId(res.data.data.openid);
                // authStore.setUserInfo({ nickName: res.data.data.nickname, headImgUrl: res.data.data.headimgurl });
                authStore.setToken(res.data.data.token);
                // uni.setStorageSync('userInfo',tempUserInfo)
                // console.log(authStore.getHeadImgUrl);
                // console.log(authStore.getNickName);
                // headImgUrl.value = res.data.data.headimgurl;
                // nickName.value = res.data.data.nickname;
                // userStore.$patch({openId:res.data.data.openId,nickName:res.data.data.nickname,headImgUrl:res.data.data.headimgurl})
                console.log("设置缓存");
                window.location.href = "http://192.168.10.254:3000/#/pages/about/index";
                // window.location.replace("http://192.168.10.254:3000/#/pages/about/index");
                // uni.switchTab({
                //     url:'/pages/about/index'
                // })
            }
        });
    }
});

onMounted(() => {

});
const handleJump = (url: string) => {
    router.push(url);
};

const getCode = () => {
    let code = "";
    let url = location.search;
    if (url.indexOf("?") != -1) {
        let strs = url.substr(1).split("&");
        for (let i in strs) {
            if (strs[i].indexOf("code") == 0) {
                code = strs[i].split("=")[1];
            }
        }
    }
    return code;
};

// 登出
const handleLoginOut = () => {
    authStore.loginOut().then(() => {
        isLogin.value = false;
    });
};

const wxlogin = () => {
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5af40ed02efff8a5&redirect_uri=http%3A%2F%2F192.168.10.254%3A3000%2F%23%2Fpages%2Fabout%2Findex&response_type=code&scope=snsapi_userinfo#wechat_redirect";
};

const zhuan = () => {
	test({p:'aaa'}).then((res:any)=>{
		console.log(res);
	})
	
};

onDeactivated(() => {
    console.log("不激活了");
});
onActivated(() => {
    console.log("激活了");
});
</script>
<template>
    <!--    <AppProvider>-->
    <view class="container">

        <view class="head-wrap">
            <view class="avatar">
                <u-avatar size="140" class="img"
                          :src="authStore.getHeadImgUrl" />
            </view>
            <!-- <view class="desc">{{ isLogin ? "测试" : "未登入" }}</view>-->
            <view class="desc">{{ authStore.getNickName }}</view>
        </view>
        <view class="cell">
            <BasicButton @click="handleJump('/pages/log/index?id=4345&title=log&word=关键词')">log</BasicButton>
        </view>
        <view class="cell" v-if="isLogin">
            <BasicButton @click="handleLoginOut">登出</BasicButton>
        </view>
        <view class="cell" v-else>
            <BasicButton @click="handleJump('/pages/login/index')"> 登入</BasicButton>
        </view>
        <view class="cell">
            <BasicButton @click="wxlogin()"> 微信登入</BasicButton>
        </view>
        <view class="cell">
            <BasicButton @click="zhuan()"> 跳转</BasicButton>
        </view>
    </view>
    <!--    </AppProvider>-->
</template>

<style lang="scss" scoped>
.container {
    //padding: 96rpx 24rpx;

    .head-wrap {
        display: flex;
        //flex-direction: column;
        align-items: center;
        //margin-top: 10rpx;
        //margin-left: 20rpx;
        padding-top: 30rpx;
        padding-left: 20rpx;
        padding-bottom: 30rpx;
        background-color: #3b82f6;

        .avatar {
            //height: 100rpx;
            //width: 100rpx;
            border: 6rpx solid #d1d5db;
            border-radius: 120rpx;
            overflow: hidden;
            //padding: 6rpx;

            .img {
                height: 100%;
                width: 100%;
            }
        }

        .desc {
            color: white;
            margin-left: 25rpx;
            flex-direction: column;
            font-size: 28rpx;
            line-height: 120rpx;
        }
    }

    .cell {
        margin-top: 60rpx;
        text-align: center;
    }
}
</style>