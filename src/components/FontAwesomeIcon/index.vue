<script lang="ts" setup name="FontAwesomeIcon">
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
  const props = defineProps(FontAwesomeIconProps);

  const emit = defineEmits<{
    (e: 'click'): void;
  }>();

  const singleBeat = props.beat && !props.fade;
  const singleFade = !props.beat && props.fade;
  const beatFade = props.beat && props.fade;
  const count = props.counter > props.counterMax ? `${props.counterMax}+` : props.counter;
  const wrapClassObject = [
    props.float ? `fa-pull-${props.float}` : '',
    props.border ? 'fa-border' : '',
    props.rotate ? 'fa-rotate-by' : '',
    props.rotateFlip ? `fa-flip-${props.rotateFlip}` : '',
    singleBeat ? `fa-beat` : '',
    singleFade ? `fa-fade` : '',
    beatFade ? `fa-beat-fade` : '',
    props.bounce ? 'fa-bounce' : '',
    props.flip ? 'fa-flip' : '',
    props.shake ? 'fa-shake' : '',
    props.spin ? 'fa-spin' : '',
    props.spinReverse ? 'fa-spin-reverse' : '',
    props.spinPulse ? 'fa-spin-pulse' : '',
    props.stack ? 'fa-stack' : '',
    props.stackChild ? `fa-stack-${props.stackX}x` : '',
    props.stackInverse ? 'fa-inverse' : '',
    props.counter ? 'layers' : '',
  ];

  const wrapStyleObject = Object.assign(
    {
      'background-color': props.bgColor,
      '--fa-animation-duration': `${props.duration}s`,
    },
    props.rotate ? { '--fa-rotate-angle': `${props.rotate}deg` } : {},
    singleBeat ? { '--fa-beat-scale': `${props.scale}` } : {},
    singleFade ? { '--fa-fade-opacity': `${props.opacity}` } : {},
    beatFade
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
    props.spin
      ? {
          '--fa-animation-delay': props.spinDelay,
          '--fa-animation-iteration-count': props.spinIterationCount,
          '--fa-animation-timing': props.spinTiming,
        }
      : {},
    props.border
      ? {
          '--fa-border-color': props.borderConfig?.color || '#eee',
          '--fa-border-padding': props.borderConfig?.padding || '.04em .26em',
          '--fa-border-radius': props.borderConfig?.radius || '.1em',
          '--fa-border-style': props.borderConfig?.style || 'solid',
          '--fa-border-width': props.borderConfig?.width || '.08em',
        }
      : {},
    props.float
      ? {
          '--fa-pull-margin': props.pullMargin,
        }
      : {},
    props.stackChild
      ? {
          '--fa-stack-z-index': props.stackZIndex,
        }
      : {},
    props.stackChild && props.stackInverse
      ? {
          '--fa-inverse': props.stackInverseColor,
        }
      : {},
  );

  const iconClassObject = [
    `fa-${props.mode}`,
    `fa-${props.name}`,
    props.frameSize ? `fa-flip-${props.frameSize}` : '',
    props.sharp ? 'fass' : '',
  ];
  const iconStyleObject = Object.assign({
    color: props.color,
    'font-size': props.size ? `${props.size}rpx` : false,
  });

  const counterStyleObject = {
    '--fa-counter-background-color': props.counterMgColor,
  };

  const onClick = () => {
    emit('click');
  };
</script>
<template>
  <template v-if="props.stack">
    <view @click="onClick" class="icon-wrap" :class="wrapClassObject" :style="wrapStyleObject">
      <slot :stack="props.stack"></slot>
      <text v-if="props.counter" class="counter" :style="counterStyleObject">{{ count }}</text>
    </view>
  </template>
  <template v-else>
    <view @click="onClick" class="icon-wrap" :class="wrapClassObject" :style="wrapStyleObject">
      <text class="icon" :style="iconStyleObject" :class="iconClassObject" />
      <text v-if="props.counter" class="counter" :style="counterStyleObject">{{ count }}</text>
    </view>
  </template>
</template>
<style lang="scss" scoped>
  .icon-wrap {
    display: inline-block;
    &.layers {
      position: relative;
      text-align: center;
    }
    .icon {
      display: inline-block;
      color: inherit;
    }
    .counter {
      display: inline-block;
      background-color: var(--fa-counter-background-color, #ff253a);
      border-radius: 1em;
      box-sizing: border-box;
      color: #fff;
      line-height: 1;
      max-width: 5em;
      min-width: 1.5em;
      overflow: hidden;
      padding: 0.25em 0.5em;
      position: absolute;
      right: -0.35em;
      text-overflow: ellipsis;
      top: 0;
      -webkit-transform: 0.35;
      transform: scale(0.35);
      -webkit-transform-origin: top right;
      transform-origin: top right;
    }
  }
</style>
