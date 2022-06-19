<script setup lang="ts">
  import BasicButton from '@/components/BasicButton/index.vue';
  import { ref } from 'vue';
  import { router } from '@/utils/router';
  const title = ref('uni-app vue3 ts --Vite');
  const handleGetStarted = () => {
    router.pushTab('/pages/demo/index');
  };
</script>
<template>
  <view class="content">
    <image class="logo" src="/static/svg/LOGO.svg" />
    <view class="text-area mb-60rpx">
      <text class="">{{ title }}</text>
    </view>
    <BasicButton @click="handleGetStarted">Get Started → </BasicButton>
  </view>
</template>
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
    margin: 280rpx auto 50rpx;
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
