/*
 * https://zhuanlan.zhihu.com/p/569976147
 * */

import presetWeapp from 'unocss-preset-weapp';
import {
  defineConfig,
  presetIcons,
  presetUno,
  presetAttributify,
} from 'unocss';
import {
  defaultAttributes,
  defaultIgnoreNonValuedAttributes,
  transformerAttributify,
  transformerClass,
} from 'unocss-preset-weapp/transformer';

const transformRules = {
  '.': '-d111-',
  '/': '-s111-',
  ':': '-c111-',
  '%': '-p111-',
  '!': '-e111-',
  '#': '-w111-',
  '(': '-b111l-',
  ')': '-b111r-',
  '[': '-f111l-',
  ']': '-f111r-',
  $: '-r111-',
  ',': '-r222-',
};

export default defineConfig({
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp({
      nonValuedAttribute: true,
      prefix: 'uno-',
    }),
    presetAttributify({}),
    presetUno(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  shortcuts: [
    {
      'border-base': 'border border-gray-500_10',
      center: 'flex justify-center items-center',
    },
  ],

  // v0.1.14 unplugin-attributify-to-class 和 unplugin-transform-class 内置到 transformer 中
  transformers: [
    // options 见 https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify({
      transformRules,
    }),

    // options 见 https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass({
      transformRules,
    }),
  ],
});
