<script lang="ts" setup>
  import BasicButton from '@/components/BasicButton/index.vue';
  import AppProvider from '@/components/AppProvider/inedx.vue';
  import { useRoute, useRouter } from '@/hooks/router';

  const router = useRouter();
  const jumpList1 = () => {
    router.push('/pagesA/list/test1/index?key=words&page=1&limit=15');
  };

  const route = useRoute();
</script>

<template>
  <AppProvider>
    <view class="container"> 页面构建中...54264536 </view>
    <view class="flex-row">
      <view>item1</view>
      <view>item2</view>
    </view>
    <BasicButton @click="jumpList1">List1 → </BasicButton>
  </AppProvider>
</template>

<style lang="scss" scoped>
  .container {
    padding: 128rpx 0;
    text-align: center;
  }
</style>
