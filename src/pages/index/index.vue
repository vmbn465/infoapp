<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area bg-rose-500 h-30rpx p-20rpx red">
      <text class="">{{ title }}</text>
    </view>
    <view>
      <button @tap="jumLogin">登录</button>
    </view>
    <view url="pages/login/index?d=43" @tap="jumLogin1" hover-class="navigator-hover">
      <button type="default">跳转到新页面</button>
    </view>
    <navigator url="/pages/log/index?d=43&title='日志'" hover-class="navigator-hover">
      <button type="default">log</button>
    </navigator>
  </view>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { router } from '@/utils/router';
  const title = ref('Hello');
  type Data = {
    token: string;
  };

  const jumLogin1 = () => {
    router.push('/pages/login1/index');
  };
  const jumLogin = () => {
    router.push('/pages/login/index');
  };
</script>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin: 200rpx auto 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
