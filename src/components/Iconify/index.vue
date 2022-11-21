<script lang="ts" setup name="Iconify">
  const props = defineProps({
    icon: {
      type: String,
    },
  });
</script>
<template>
  <view
    class="iconify m-iconify"
    style="height: 44rpx; width: 44rpx"
    :data-icon="icon"
  ></view>
</template>
<style lang="scss" scoped>
  .m-iconify {
    vertical-align: middle;
  }
</style>
