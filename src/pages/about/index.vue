<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import BasicButton from '@/components/BasicButton/index.vue';
import AppProvider from '@/components/AppProvider/inedx.vue';
import { useAuthStore } from '@/state/modules/auth';
import { useRouter } from 'uni-mini-router';

const authStore = useAuthStore();
const isLogin = ref(false);
const router = useRouter();
onShow(() => {
	isLogin.value = authStore.isLogin;
});

onMounted(() => {
	let code = getCode()
	console.log(window.location.href);
	if (code != null && code != '' && code != undefined) {
		console.log('登录中',code);
		uni.request({
			url: '/api/user/wxlogin',
			data: {
				code: code
			},
			success: (res) => {
				console.log(res);
				window.location.href='http://192.168.10.254:3000/#/pages/about/index'
			}
		})
	}
})
const handleJump = (url : string) => {
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
}

// 登出
const handleLoginOut = () => {
	authStore.loginOut().then(() => {
		isLogin.value = false;
	});
};

const wxlogin = () => {
	window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5af40ed02efff8a5&redirect_uri=http%3A%2F%2F192.168.10.254%3A3000%2F%23%2Fpages%2Fabout%2Findex&response_type=code&scope=snsapi_userinfo#wechat_redirect'
}
</script>

<template>
	<AppProvider>
		<view class="container">
			<view class="head-wrap">
				<view class="avatar">
					<image class="img" src="/static/images/avatar.png" />
				</view>
				<view class="desc">{{ isLogin ? '测试' : '未登入' }}</view>
			</view>
			<view class="cell">
				<BasicButton @click="handleJump('/pages/log/index?id=4345&title=log&word=关键词')">log</BasicButton>
			</view>
			<view class="cell" v-if="isLogin">
				<BasicButton @click="handleLoginOut">登出</BasicButton>
			</view>
			<view class="cell" v-else>
				<BasicButton @click="handleJump('/pages/login/index')"> 登入 </BasicButton>
			</view>
			<view class="cell">
				<BasicButton @click="wxlogin()"> 微信登入 </BasicButton>
			</view>
		</view>
	</AppProvider>
</template>

<style lang="scss" scoped>
	.container {
		padding: 96rpx 24rpx;

		.head-wrap {
			display: flex;
			flex-direction: column;
			align-items: center;

			.avatar {
				height: 120rpx;
				width: 120rpx;
				border: 2rpx solid #d1d5db;
				border-radius: 120rpx;
				overflow: hidden;
				padding: 6rpx;

				.img {
					height: 100%;
					width: 100%;
				}
			}

			.desc {
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