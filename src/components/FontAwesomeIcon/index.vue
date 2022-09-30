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

  const props = defineProps(FontAwesomeIconProps);

  const wrapStyleObject = {
    color: props.color,
    'font-size': props.size ? `${props.size}rpx` : false,
    'background-color': props.bgColor,
    'fa-border': props.border,
  };

  const singleBeat = props.beat && !props.fade;
  const singleFade = !props.beat && props.fade;
  const BeatFade = props.beat && props.fade;

  const iconClassObject = [
    `fa-${props.mode}`,
    `fa-${props.name}`,
    props.frameSize ? `fa-flip-${props.frameSize}` : '',
    props.sharp ? 'fass' : '',
    props.rotate ? 'fa-rotate-by' : '',
    props.rotateFlip ? `fa-flip-${props.rotateFlip}` : '',
    singleBeat ? `fa-beat` : '',
    singleFade ? `fa-fade` : '',
    BeatFade ? `fa-beat-fade` : '',
    props.bounce ? 'fa-bounce' : '',
    props.flip ? 'fa-flip' : '',
    props.shake ? 'fa-shake' : '',
  ];
  const iconStyleObject = Object.assign(
    {
      '--fa-animation-duration': `${props.duration}s`,
    },
    props.rotate ? { '--fa-rotate-angle': `${props.rotate}deg` } : {},
    singleBeat ? { '--fa-beat-scale': `${props.scale}` } : {},
    singleFade ? { '--fa-fade-opacity': `${props.opacity}` } : {},
    BeatFade
      ? { '--fa-beat-fade-scale': `${props.scale}`, '--fa-beat-fade-opacity': `${props.opacity}` }
      : {},
    props.bounce
      ? {
          '--fa-bounce-rebound': props.bounceConfig?.rebound || '-0.125em',
          '--fa-bounce-height': props.bounceConfig?.height || '-0.5em',
          '--fa-bounce-start-scale-x': props.bounceConfig?.startScaleX || '1.1',
          '--fa-bounce-start-scale-y': props.bounceConfig?.startScaleY || '0.9',
          '--fa-bounce-jump-scale-x': props.bounceConfig?.jumpScaleX || '0.9',
          '--fa-bounce-jump-scale-y': props.bounceConfig?.jumpScaleY || '1.1',
          '--fa-bounce-land-scale-x': props.bounceConfig?.landScaleX || '1.05',
          '--fa-bounce-land-scale-y': props.bounceConfig?.landScaleY || '0.95',
        }
      : {},
    props.flip
      ? {
          '--fa-flip-x': props.flipConfig?.x || '0',
          '--fa-flip-y': props.flipConfig?.y || '1',
          '--fa-flip-z': props.flipConfig?.z || '0',
          '--fa-flip-angle': props.flipConfig?.angle || '-180deg',
        }
      : {},
  );
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
      color: inherit;
    }
  }
</style>
