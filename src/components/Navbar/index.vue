<script lang="ts" setup name="Navbar"></script>
<template>
  <view class="navbar-wrapper _u_bg-lime-400">
    <!-- 顶部状态栏 S-->
    <view class="status-bar"></view>
    <!-- 顶部状态栏 E-->
  </view>
</template>
<style lang="scss" scoped>
  .navbar-wrapper {
    .status-bar {
      height: var(--status-bar-height);
    }
  }
</style>
