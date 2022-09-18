<script setup lang="ts">
  import BasicButton from '@/components/BasicButton/index.vue';
  import AppProvider from '@/components/AppProvider/inedx.vue';
  import { ref } from 'vue';
  import { useRouter } from '@/hooks/router';
  import { CURRENT_PLATFORM } from '@/enums/platformEnum';
  const title = ref('uni-app vue3 ts --Vite');

  const platform = CURRENT_PLATFORM;

  const router = useRouter();
  const handleGetStarted = () => {
    router.pushTab('/pages/demo/index?d=str');
  };
</script>
<template>
  <AppProvider>
    <view class="content">
      <image class="logo" src="/static/svg/LOGO.svg" />
      <view class="text-area">
        <text class="">{{ title }}</text>
      </view>
      <view class="text-area">
        <text class="">当前平台: {{ platform }}</text>
      </view>
      <BasicButton @click="handleGetStarted">Get Started → </BasicButton>
    </view>
  </AppProvider>
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
    margin-bottom: 60rpx;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
