import { getBaseUrl } from '@/utils/env';

const fa_style_family = 'Font Awesome 6';

const fa_style_family_solid = `${fa_style_family} Solid`;
const fa_style_family_regular = `${fa_style_family} Regular`;
const fa_style_family_light = `${fa_style_family} Light`;
const fa_style_family_thin = `${fa_style_family} Thin`;
const fa_style_family_sharp_solid = `${fa_style_family} Sharp Solid`;
const fa_style_family_brands = `${fa_style_family} Brands Regular`;
const fa_style_family_duotone = `${fa_style_family} Duotone Solid`;

const BASE_URL = getBaseUrl();
/* 实际项目中替换为自己服务器的url */
const LOAD_FONT_FACE_URL = `${BASE_URL}/fonts`;

const fontFamilyList = [
  {
    family: fa_style_family_solid,
    source: `${LOAD_FONT_FACE_URL}/fa-solid-900.woff2`,
    weight: '900',
  },
  {
    family: fa_style_family_regular,
    source: `${LOAD_FONT_FACE_URL}/fa-regular-400.woff2`,
    weight: '400',
  },
  {
    family: fa_style_family_light,
    source: `${LOAD_FONT_FACE_URL}/fa-light-300.woff2`,
    weight: '300',
  },
  {
    family: fa_style_family_thin,
    source: `${LOAD_FONT_FACE_URL}/fa-thin-100.woff2`,
    weight: '100',
  },
  {
    family: fa_style_family_sharp_solid,
    source: `${LOAD_FONT_FACE_URL}/fa-sharp-solid-900.woff2`,
    weight: '900',
  },
  {
    family: fa_style_family_duotone,
    source: `${LOAD_FONT_FACE_URL}/fa-duotone-900.woff2`,
    weight: '900',
  },
  {
    family: fa_style_family_brands,
    source: `${LOAD_FONT_FACE_URL}/fa-brands-400.woff2`,
    weight: '400',
  },
];

function LoadFontFace(data: UniApp.LoadFontFaceOptions & { weight?: string; global?: boolean }) {
  return new Promise((resolve, reject) => {
    uni.loadFontFace({
      global: true,
      ...data,
      desc: {
        style: 'normal',
        weight: data.weight ?? 'normal',
        variant: 'normal',
      },
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

export function dynamicLoadFontFace() {
  fontFamilyList.forEach((fontFamily) => {
    LoadFontFace(fontFamily)
      .then((res: any) => {
        console.log(fontFamily.family, res.errMsg);
      })
      .catch((err) => {
        console.error(fontFamily.family, err.errMsg);
      });
  });
}
