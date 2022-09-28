<script lang="ts" setup>
  /**
   * 基于 Font Awesome Icon v6.2.0
   * 不支持 pro (专业版)的相关功能 和 图标
   * solid 支持
   * regular 支持
   * brands 支持
   * light 不支持
   * sharp 不支持
   * thin 不支持
   * duotone 不支持
   */
</script>
<template>
  <view> <view class="fa-solid fa-house" />solid </view>
  <view> <view class="fa-regular fa-house" />regular</view>
  <view> <view class="fa-light fa-house" />light</view>
  <view> <view class="fa-thin fa-house" />thin</view>
  <view> <view class="fa-duotone fa-house" />duotone</view>
  <view> <view class="fa-brands fa-bilibili" />brands </view>
</template>
<style lang="scss" scoped>
  .font-awesome-icon {
    display: inline-block;
  }
</style>
