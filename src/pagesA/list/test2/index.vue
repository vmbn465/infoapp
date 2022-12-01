<script lang="ts" setup>
  import BasicButton from '@/components/BasicButton/index.vue';
  import { useRouter } from '@/hooks/router';
  import Navbar from '@/components/Navbar/index.vue';

  const router = useRouter();
  const jumpDetail = () => {
    router.push('/pagesB/detail/index?page=1&limit=20');
  };
</script>
<template>
  <view>
    <Navbar />
    <view> Test2 </view>
    <BasicButton @click="jumpDetail">Detail → </BasicButton>
  </view>
</template>
<style scoped></style>
