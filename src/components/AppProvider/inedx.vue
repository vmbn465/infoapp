<script lang="ts" setup name="AppProvider">
  import { useAppStore } from '@/state/modules/app';

  const appStore = useAppStore();
  console.log('getPages', appStore.getPages);
  // eslint-disable-next-line no-undef
  let currentPages = getCurrentPages();
  console.log('currentPages', currentPages);
</script>
<template>
  <view>
    <slot></slot>
  </view>
</template>
<style scoped></style>
