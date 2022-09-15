import pagesJson from '@/pages.json';
import { Pages } from '@/types/pages';

const { pages, subPackages } = pagesJson;

// 将pages.json转换成Map对象,path为key
const pagesMap = new Map<string, Pages>();

pages.forEach((page) => {
  pagesMap.set(page.path, page as Pages);
});

if (Array.isArray(subPackages) && subPackages.length) {
  subPackages.forEach((el) => {
    const rootPath = el.root;
    el.pages.forEach((page) => {
      page.path = rootPath + '/' + page.path;
      pagesMap.set(page.path, page as Pages);
    });
  });
}

export { pagesMap };
