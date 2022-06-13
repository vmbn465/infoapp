<template>
  <view>log</view>
</template>

<script lang="ts" setup>
  import { onLoad } from '@dcloudio/uni-app';
  onLoad((query) => {
    console.log('log onLOad', query);
  });
</script>

<style lang="scss" scoped></style>
