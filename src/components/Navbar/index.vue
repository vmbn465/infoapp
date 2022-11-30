<script lang="ts" setup name="Navbar">
  import { useSystem } from '@/hooks/useSystem';
  import { px2rpx } from '@/utils/uniapi';
  import { computed, ref } from 'vue';
  import { useRoute } from '@/hooks/router';
  import { useGlobalStyle } from '@/hooks/useGlobalStyle';

  const {
    navigationBarBackgroundColor,
    navigationBarTitleText,
    navigationBarTextStyle,
  } = useGlobalStyle();

  const { currentRoute } = useRoute();

  const props = defineProps({
    bgColor: { type: String },
    title: { type: String },
    titleColor: { type: String },
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
  const navbarBgColor = computed(
    () => props.bgColor || navigationBarBackgroundColor,
  );
  const navbarTitle = computed(
    () =>
      props.title ||
      currentRoute?.style?.navigationBarTitleText ||
      navigationBarTitleText,
  );
  const navbarTitleColor = computed(
    () =>
      props.titleColor ||
      currentRoute?.style?.navigationBarTextStyle ||
      navigationBarTextStyle,
  );
</script>
<template>
  <view class="head-wrapper">
    <view class="page-head _u_head-fixed">
      <!-- 顶部状态栏 -->
      <view class="status-bar"></view>
      <!-- navbar -->
      <view
        class="navbar-wrapper _u_flex _u_flex-nowrap _u_justify-between _u_items-center"
      >
        <view
          class="_u_flex _u_flex-nowrap _u_justify-flex-start _u_items-center _u_h-full _u_w3/10 _u_min-w3/10"
        >
          <slot name="left">left</slot>
        </view>
        <view
          class="navbar__center _u_flex _u_flex-nowrap _u_justify-center _u_items-center _u_h-full _u_w2/5 _u_min-w2/5"
        >
          <slot>
            <text>{{ navbarTitle }}</text>
          </slot>
        </view>
        <view
          class="_u_flex _u_flex-nowrap _u_justify-flex-end _u_items-center _u_h-full _u_w3/10 _u_min-w3/10"
        >
          <slot name="right"></slot>
        </view>
      </view>
    </view>
    <!-- 占位符 -->
    <view class="placeholder"></view>
  </view>
</template>
<style lang="scss" scoped>
  .head-wrapper {
    .page-head {
      background: v-bind(navbarBgColor);
      .status-bar {
        height: v-bind(statusHeight);
      }
      .navbar-wrapper {
        height: v-bind(navbarHeight);
        padding-left: v-bind(sideGap);
        padding-right: v-bind(sideGap);
        .navbar__center {
          color: v-bind(navbarTitleColor);
        }
      }
    }
    &,
    .placeholder {
      height: v-bind(headHeight);
      min-height: v-bind(headHeight);
    }
  }
</style>
