type StyleType = 'solid' | 'regular' | 'light' | 'thin' | 'duotone' | 'brands' | 'sharp';

export const FontAwesomeIconProps = {
  /** icon name
   * @link: https://fontawesome.com/icons
   */
  name: {
    type: String,
    required: true,
  },
  /** icon 风格
   * 不同风格对应不同的css, 使用时请加载相应的css
   */
  mode: {
    type: String,
    default: 'solid',
    validator(value: string) {
      // The value must match one of these strings
      return ['solid', 'regular', 'light', 'thin', 'duotone', 'brands'].includes(value);
    },
  },
  /** icon sharp
   * 对应sharp css
   */
  sharp: {
    type: Boolean,
    default: false,
  },
  /**
   * icon sizing
   * @description 2xs-xs-sm-lg-xl-2xl 1-10x
   */
  frameSize: {
    type: String,
  },
  /**
   * icon size
   * @description 大小 单位 rpx
   */
  size: {
    type: Number,
  },
  /**
   * icon color
   * @description 图标颜色
   */
  color: {
    type: String,
  },
  /**
   * icon color
   * @description 背景色
   */
  bgColor: {
    type: String,
  },
  /** icon border
   * @description 边框
   */
  border: {
    type: Boolean,
    default: false,
  },
  /** icon rotate
   * @description 旋转角度
   */
  rotate: {
    type: Number,
    default: 0,
  },
  /** icon flip
   * @description 翻转
   */
  flip: {
    type: String,
    validator(value: string) {
      // The value must match one of these strings
      return ['horizontal', 'vertical', 'both'].includes(value);
    },
  },
  /**
   * icon beat
   * @description 跳动动画
   * @param duration Number 时间 s
   * @param scale Number 比例
   */
  beat: {
    type: Boolean,
    default: false,
  },
  /**
   * icon duration
   * @description 动画持续时间(所有动画使用) s
   */
  duration: {
    type: Number,
    default: 1,
  },
  /**
   * icon scale
   * @description 动画比例(跳动动画使用)
   */
  scale: {
    type: Number,
    default: 1.25,
  },
  /**
   * icon fade
   * @description 淡入淡出动画
   */
  fade: {
    type: Boolean,
    default: false,
  },
  /**
   * icon opacity
   * @description 透明度值 (淡入淡出动画使用)
   */
  opacity: {
    type: Number,
    default: 0.6,
  },
};
