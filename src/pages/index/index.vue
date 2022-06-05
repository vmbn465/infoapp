<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area bg-rose-500 h-30rpx p-20rpx red">
      <text class="">{{ title }}</text>
    </view>
    <view>{{ url }} ----</view>
    <Test />
    <view>
      <button @tap="jumLogin">登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Test from '@/components/test/Test.vue';
  const title = ref('Hello');
  const url = import.meta.env.VITE_BASE_URL;
  console.log('url', url);
  const jumLogin = () => {
    console.log('/pages/login/index');

    // uni.navigateTo({
    //   url: '/pages/login/index',
    // });
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
