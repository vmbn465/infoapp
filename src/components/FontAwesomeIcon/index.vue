<script lang="ts" setup>
  /**
   * 基于 Font Awesome Icon v6.2.0
   * solid 支持
   * regular 支持
   * brands 支持
   * light 支持
   * sharp 支持
   * thin 支持
   * duotone 支持
   */
  import { FontAwesomeIconProps } from '@/components/FontAwesomeIcon/props';
  import { computed } from 'vue';
  import { isObject } from 'lodash-es';

  const props = defineProps(FontAwesomeIconProps);

  const wrapStyleObject = {
    color: props.color,
    'font-size': `${props.size}rpx`,
    'background-color': props.bgColor,
    'fa-border': props.border,
  };

  const iconClassObject = [
    'fa-' + props.mode,
    'fa-' + props.name,
    props.frameSize ? `fa-flip-${props.frameSize}` : '',
    props.sharp ? 'fass' : '',
    props.rotate ? 'fa-rotate-by' : '',
    props.flip ? `fa-flip-${props.flip}` : '',
    props.beat ? `fa-beat` : '',
    props.fade ? `fa-fade` : '',
    props.beat && props.fade ? `fa-beat-fade` : '',
  ];

  const iconStyleObject = {
    '--fa-rotate-angle': `${props.rotate}deg`,
    '--fa-animation-duration': `${props.duration}s`,
    '--fa-beat-scale': `${props.scale}`,
    '--fa-beat-opacity': `${props.opacity}`,
  };
</script>
<template>
  <view class="icon-wrap" :style="wrapStyleObject">
    <text class="icon" :style="iconStyleObject" :class="iconClassObject" />
  </view>
</template>
<style lang="scss" scoped>
  .icon-wrap {
    display: inline-block;
    .icon {
      display: inline-block;
    }
  }
</style>
