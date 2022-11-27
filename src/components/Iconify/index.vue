<script lang="ts" setup name="Iconify">
  const props = defineProps({
    icon: {
      type: String,
    },
  });
</script>
<template>
  <view ref="elRef" class="iconify m-iconify i-ph-anchor-simple-thin"></view>
</template>
<style lang="scss" scoped>
  .iconify {
    display: inline-block;
    height: 44rpx;
    width: 44rpx;
  }
  .m-iconify {
    vertical-align: middle;
  }
</style>
