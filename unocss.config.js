/**
 * unocss defineConfig
 * @link unocss: https://github.com/unocss/unocss
 * @link unocss-preset-weapp: https://github.com/MellowCo/unocss-preset-weapp
 * */

import { defineConfig, presetAttributify, presetIcons } from 'unocss';
import presetWeapp from 'unocss-preset-weapp';
import {
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

const prefix = `un-`;

export default defineConfig({
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp({
      nonValuedAttribute: true,
      prefix: prefix,
      whRpx: true,
      transform: true,
      platform: 'uniapp',
    }),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  shortcuts: [
    {
      'border-base': 'border border-gray-500_10',
      'un-center': 'un-flex un-justify-center un-items-center',
    },
  ],
  theme: {},
  transformers: [
    // options 见 https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify({
      classPrefix: prefix,
      transformRules,
      nonValuedAttribute: true,
    }),
    // options 见 https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass({
      transformRules,
    }),
  ],
});
