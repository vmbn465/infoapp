<script lang="ts" setup name="Navbar">
  import { useSystem } from '@/hooks/useSystem';
  import { px2rpx } from '@/utils/uniapi';
  import { computed, ref } from 'vue';

  const props = defineProps({
    bgColor: { type: String },
    gap: { type: [String, Number], default: 24 },
  });

  const { statusBarHeight } = useSystem();
  const statusHeight = computed(() => `${px2rpx(statusBarHeight!)}rpx`);
  const defaultNavbarHeight = ref(44);
  const navbarHeight = computed(
    () => `${px2rpx(defaultNavbarHeight.value)}rpx`,
  );
  const headHeight = computed(
    () => `${px2rpx((statusBarHeight || 0) + defaultNavbarHeight.value)}rpx`,
  );
  const sideGap = computed(() => `${props.gap}rpx`);
</script>
<template>
  <view class="head-wrapper _u_bg-lime-400">
    <view class="_u_head-fixed">
      <!-- 顶部状态栏 -->
      <view class="status-bar"></view>
      <!-- navbar -->
      <view
        class="navbar-wrapper _u_flex _u_flex-nowrap _u_justify-between _u_items-center"
      >
        <view
          class="_u_flex _u_flex-row-reverse _u_justify-flex-start _u_items-center _u_h-full"
          >left</view
        >
        <view
          class="_u_flex _u_flex-row-reverse _u_justify-center _u_items-center _u_h-full _u_w2/5 _u_min-w2/5"
          ><text>标题</text></view
        >
        <view
          class="_u_flex _u_flex-row-reverse _u_justify-flex-end _u_items-center _u_h-full"
          >right</view
        >
      </view>
    </view>
    <!-- 占位符 -->
    <view class="placeholder"></view>
  </view>
</template>
<style lang="scss" scoped>
  .head-wrapper {
    .status-bar {
      height: v-bind(statusHeight);
    }
    .navbar-wrapper {
      height: v-bind(navbarHeight);
      padding-left: v-bind(sideGap);
      padding-right: v-bind(sideGap);
    }
    &,
    .placeholder {
      height: v-bind(headHeight);
      min-height: v-bind(headHeight);
    }
  }
</style>
