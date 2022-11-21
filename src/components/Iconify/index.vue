<script lang="ts" setup name="Iconify">
  // import '@purge-icons/generated';
  // const props = defineProps({
  //   icon: {
  //     type: String,
  //   },
  // });
  import Iconify from '@purge-icons/generated';
  import { nextTick, ref, unref, watchEffect } from 'vue';
  const props = defineProps({
    name: {
      type: String,
      default: () => '',
    },
    prefix: {
      type: String,
      default: () => 'ant-design',
    },
  });
  const elRef = ref<Element>();
  const update = async () => {
    const el = unref(elRef);
    if (!el) return;
    await nextTick();
    const icon = props.prefix + ':' + props.name;
    if (!icon) return;
    const svg = Iconify.renderSVG(icon, {
      width: '1.2em',
      height: '1.2em',
    });
    if (svg) {
      el.textContent = '';
      el.appendChild(svg);
    } else {
      const span = document.createElement('span');
      span.className = 'iconify';
      span.dataset.icon = icon;
      el.textContent = '';
      el.appendChild(span);
    }
  };
  watchEffect(() => update());
</script>
<template>
  <view ref="elRef" class="iconify m-iconify" class="anticon"></view>
</template>
<style lang="scss" scoped>
  .iconify {
    display: inline-block;
    height: 44rpx;
    width: 44rpx;
  }
  .m-iconify {
    vertical-align: middle;
  }
</style>
