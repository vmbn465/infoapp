<script lang="ts" setup>
  import AppProvider from '@/components/AppProvider/inedx.vue';
  import FontAwesomeIcon from '@/components/FontAwesomeIcon/index.vue';
</script>
<template>
  <AppProvider>
    <view>mode-不同风格</view>
    <view> <FontAwesomeIcon name="house" />solid </view>
    <view> <FontAwesomeIcon mode="regular" name="house" />regular</view>
    <view> <FontAwesomeIcon mode="light" name="house" />light</view>
    <view> <FontAwesomeIcon mode="thin" name="house" />thin</view>
    <view> <FontAwesomeIcon mode="duotone" name="house" />duotone</view>
    <view>sharp-直角图标</view>
    <view> <FontAwesomeIcon name="user" sharp /> sharp </view>

    <view>mode(brands)-品牌logo</view>
    <view> <FontAwesomeIcon mode="brands" name="bilibili" /> bilibili </view>
    <view> <FontAwesomeIcon mode="brands" name="alipay" /> alipay </view>

    <view>color-颜色</view>
    <view> <FontAwesomeIcon name="house" color="Tomato" />solid </view>
    <view> <FontAwesomeIcon mode="regular" name="house" color="Dodgerblue" />regular</view>
    <view> <FontAwesomeIcon mode="light" name="house" color="Mediumslateblue" />light</view>
    <view> <FontAwesomeIcon mode="brands" name="bilibili" color="Dodgerblue" /> brands </view>

    <view>size-大小</view>
    <view> <FontAwesomeIcon mode="light" name="house" size="24" />light 24rpx</view>
    <view> <FontAwesomeIcon mode="thin" name="house" size="44" />thin 44rpx</view>
    <view> <FontAwesomeIcon mode="duotone" name="house" size="64" />duotone 64rpx</view>
    <view>bgColor-背景色</view>
    <view> <FontAwesomeIcon name="house" bg-color="DodgerBlue" />solid </view>
    <view> <FontAwesomeIcon mode="regular" name="house" bg-color="SkyBlue" />regular</view>
    <view>rotate-旋转角度</view>
    <view> <FontAwesomeIcon mode="duotone" name="house" rotate="63" />duotone 63</view>
    <view> <FontAwesomeIcon mode="duotone" name="snowboarding" rotate="58" />duotone 58</view>
    <view>rotateFlip-旋转-翻转</view>
    <view> <FontAwesomeIcon mode="duotone" name="snowboarding" />duotone 正常</view>
    <view>
      <FontAwesomeIcon mode="duotone" name="snowboarding" rotate-flip="horizontal" />
      duotone 水平翻转
    </view>
    <view>
      <FontAwesomeIcon mode="duotone" name="snowboarding" rotate-flip="vertical" />duotone 垂直翻转
    </view>
    <view>
      <FontAwesomeIcon mode="duotone" name="snowboarding" rotate-flip="both" />duotone 垂直水平翻转
    </view>
    <view>beat-缩放动画</view>
    <FontAwesomeIcon name="circle-plus" beat />
    <FontAwesomeIcon name="heart" beat />
    <view>duration-动画持续时间</view>
    <FontAwesomeIcon name="heart" beat duration="1.5" />
    <view>scale-缩放比例</view>
    <FontAwesomeIcon name="heart" beat duration="1.5" scale="2.0" />
    <view>fade-淡入淡出动画 </view>
    <FontAwesomeIcon name="heart" fade />
    <view>opacity-透明度值 </view>
    <FontAwesomeIcon name="heart" fade opacity="0.2" />
    <view>beat+fade-跳动+淡入淡出动画 </view>
    <FontAwesomeIcon name="heart" beat fade opacity="0.68" duration="1.5" scale="2.0" />
    <view>bounce-弹跳动画 </view>
    <FontAwesomeIcon name="basketball" bounce />
    <FontAwesomeIcon name="volleyball" bounce />
    <FontAwesomeIcon name="frog" bounce />
    <FontAwesomeIcon
      name="envelope"
      bounce
      :bounce-config="{
        rebound: 0,
        startScaleX: 1,
        startScaleY: 1,
        jumpScaleX: 1,
        jumpScaleY: 1,
        landScaleX: 1,
        landScaleY: 1,
      }"
    />
    <view>flip-翻转动画</view>
    <FontAwesomeIcon name="compact-disc" flip />
    <FontAwesomeIcon name="camera-rotate" flip />
    <FontAwesomeIcon name="cassette-tape" flip />
    <FontAwesomeIcon
      name="scroll"
      flip
      :flip-config="{
        x: '1',
        y: '0',
      }"
    />
    <FontAwesomeIcon name="money-check-dollar" flip duration="3" />

    <view>shake-抖动动画</view>
    <FontAwesomeIcon name="bell" shake />
    <FontAwesomeIcon name="stopwatch" shake />
    <FontAwesomeIcon name="bomb" shake />
    <view>spin-旋转动画</view>
    <FontAwesomeIcon name="sync" spin duration="2" />
    <FontAwesomeIcon name="circle-notch" spin duration="1.5" />
    <FontAwesomeIcon name="cog" spin duration="2" />
    <FontAwesomeIcon name="cog" spin spin-reverse duration="15" />
    <FontAwesomeIcon name="spinner" spin spin-pulse spinDelay="5s" duration="2" />
    <FontAwesomeIcon
      name="spinner"
      spin
      spin-pulse
      spin-reverse
      spinIterationCount="3"
      duration="2"
    />
  </AppProvider>
</template>
<style lang="scss" scoped></style>
