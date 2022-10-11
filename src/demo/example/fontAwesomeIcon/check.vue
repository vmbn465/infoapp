<script lang="ts" setup>
  import AppProvider from '@/components/AppProvider/inedx.vue';
  import FontAwesomeIcon from '@/components/FontAwesomeIcon/index.vue';
  import Test from '@/components/Test/index.vue';
  import { reactive, ref } from 'vue';

  const iconName = ref('house');

  const modeList = ['solid', 'regular', 'light', 'thin', 'duotone', 'brands'];

  const colors = [
    {
      color: '#000000',
      name: '黑色',
    },
    {
      color: '#FFFFFF',
      name: '白色',
    },
    {
      color: '#0000FF',
      name: '蓝色',
    },
    {
      color: '#008080',
      name: '蓝绿色',
    },
    {
      color: '#FF0000',
      name: '红色',
    },
    {
      color: '#00FF00',
      name: '绿色',
    },
    {
      color: '#FFFF00',
      name: '黄色',
    },
  ];

  const sizes = ['24', '44', '64', '88'];
  const rotates = [false, '45', '20', '69', '90', '180', '270', '288'];
  const rotateFlips = [
    {
      value: false,
      name: '正常',
    },
    {
      value: 'horizontal',
      name: '水平翻转',
    },
    {
      value: 'vertical',
      name: '垂直翻转',
    },
    {
      value: 'both',
      name: '垂直水平翻转',
    },
  ];
  const animations = [
    {
      value: 'beat',
      name: '缩放',
    },
    {
      value: 'fade',
      name: '淡入淡出',
    },
    {
      value: 'bounce',
      name: '弹跳',
    },
    {
      value: 'flip',
      name: '翻转',
    },
    {
      value: 'shake',
      name: '抖动',
    },
    {
      value: 'spin',
      name: '旋转',
    },
  ];

  const attribute = reactive({
    mode: 'solid',
    sharp: false,
    color: '#000000',
    size: '',
    rotate: false,
    rotateFlip: false,
    beat: false,
    fade: false,
    bounce: false,
    flip: false,
    shake: false,
    spin: false,
  });

  const setAttribute = (e: any) => {
    console.log(e);
    const key = e.currentTarget.dataset.k;
    const value = e.currentTarget.dataset.v;
    const replaces = ['mode', 'color', 'size', 'rotate', 'rotateFlip'];
    if (key in attribute) {
      if (replaces.includes(key)) {
        // @ts-ignore
        attribute[key] = value;
        if (key == 'mode') attribute.sharp = false;
        if (key == 'rotate') attribute.rotateFlip = false;
        if (key == 'rotateFlip') attribute.rotate = false;
        return;
      }
      // @ts-ignore
      attribute[key] = !attribute[key];
      if (key == 'sharp' && attribute.sharp) {
        attribute.mode = 'solid';
      }
    }
  };
</script>
<template>
  <AppProvider>
    <view class="title">Icon Check</view>
    <FontAwesomeIcon
      :name="iconName"
      :mode="attribute.mode"
      :sharp="attribute.sharp"
      :color="attribute.color"
      :size="attribute.size"
      :rotate="attribute.rotate"
      :rotate-flip="attribute.rotateFlip"
    />
    <Test :text="attribute.mode" />
    <view class="check-wrap">
      <view class="input-wrap">
        <input placeholder="Icon Name" v-model.trim.lazy="iconName" />
      </view>
      <view class="icon-wrap">
        <FontAwesomeIcon name="circle-exclamation-check" />
      </view>
    </view>
    <view class="attribute-wrap">
      <view class="mode">
        <view>风格(mode): </view>
        <view class="attribute-list">
          <template v-for="(mode, index) in modeList" :key="index">
            <view
              class="attribute-item"
              @click="setAttribute"
              data-k="mode"
              :data-v="mode"
            >
              <FontAwesomeIcon
                mode="regular"
                :name="attribute.mode == mode ? 'circle-dot' : 'circle'"
              /><text>{{ mode }}</text>
            </view>
          </template>
          <view
            class="attribute-item"
            style="width: 50%"
            @click="setAttribute"
            data-k="sharp"
          >
            <FontAwesomeIcon
              :mode="attribute.sharp ? 'solid' : 'regular'"
              :name="attribute.sharp ? 'square-check' : 'square'"
            /><text>直角(sharp)</text>
          </view>
        </view>
      </view>
      <view class="color">
        <view>颜色(color): </view>
        <view class="attribute-list">
          <template v-for="(item, index) in colors" :key="index">
            <view
              class="attribute-item"
              @click="setAttribute"
              data-k="color"
              :data-v="item.color"
            >
              <FontAwesomeIcon
                mode="regular"
                :name="attribute.color == item.color ? 'circle-dot' : 'circle'"
              /><text>{{ item.name }}</text>
            </view>
          </template>
        </view>
      </view>
      <view class="size">
        <view>大小(size)[rpx]: </view>
        <view class="attribute-list">
          <template v-for="(item, index) in sizes" :key="index">
            <view
              class="attribute-item"
              @click="setAttribute"
              data-k="size"
              :data-v="item"
            >
              <FontAwesomeIcon
                mode="regular"
                :name="attribute.size == item ? 'circle-dot' : 'circle'"
              /><text>{{ item }}rpx</text>
            </view>
          </template>
        </view>
      </view>
      <view class="rotate">
        <view>旋转角度(rotate)[deg]: </view>
        <view class="attribute-list">
          <template v-for="(item, index) in rotates" :key="index">
            <view
              class="attribute-item"
              @click="setAttribute"
              data-k="rotate"
              :data-v="item"
            >
              <FontAwesomeIcon
                mode="regular"
                :name="attribute.rotate == item ? 'circle-dot' : 'circle'"
              /><text>{{ index != 0 ? item + 'deg' : '正常' }}</text>
            </view>
          </template>
        </view>
      </view>
      <view class="color">
        <view>翻转(rotateFlip): </view>
        <view class="attribute-list">
          <template v-for="(item, index) in rotateFlips" :key="index">
            <view
              class="attribute-item"
              style="width: 50%"
              @click="setAttribute"
              data-k="rotateFlip"
              :data-v="item.value"
            >
              <FontAwesomeIcon
                mode="regular"
                :name="
                  attribute.rotateFlip == item.value ? 'circle-dot' : 'circle'
                "
              /><text>{{ item.name }}</text>
            </view>
          </template>
        </view>
      </view>
      <view class="animation">
        <view>动画: </view>
        <view class="attribute-list">
          <view
            class="attribute-item"
            style="width: 50%"
            @click="setAttribute"
            data-k="sharp"
          >
            <FontAwesomeIcon
              :mode="attribute.sharp ? 'solid' : 'regular'"
              :name="attribute.sharp ? 'square-check' : 'square'"
            /><text>直角(sharp)</text>
          </view>
          <template v-for="(item, index) in animations" :key="index">
            <view
              class="attribute-item"
              style="width: 50%"
              @click="setAttribute"
              :data-k="item.value"
            >
              <FontAwesomeIcon
                :mode="attribute[item.value] ? 'solid' : 'regular'"
                :name="attribute[item.value] ? 'square-check' : 'square'"
              /><text>{{ item.name }}</text>
            </view>
          </template>
        </view>
      </view>
    </view>
  </AppProvider>
</template>
<style lang="scss" scoped>
  .title {
    margin: 60rpx 0 36rpx 0;
    text-align: center;
    font-size: 32rpx;
    font-weight: 600;
  }
  .check-wrap {
    background-color: #ffffff;
    height: 88rpx;
    border-radius: 88rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36rpx;
    .input-wrap {
      flex-grow: 1;
      input {
        height: 64rpx;
      }
    }
    .icon-wrap {
      width: 64rpx;
      text-align: right;
      font-size: 40rpx;
    }
  }
  .attribute-wrap {
    margin-top: 24rpx;
    .attribute-list {
      display: flex;
      flex-wrap: wrap;
      .attribute-item {
        width: 30%;
        height: 56rpx;
        padding-left: 32rpx;
        text {
          margin-left: 10rpx;
        }
      }
      .mode {
      }
    }
  }
</style>
