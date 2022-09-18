import pagesJson from '@/pages.json';
import { Route } from '@/types/router/route';

const { pages, subPackages } = pagesJson;

// 将pages.json转换成Map对象,path为key
const pagesMap = new Map<string, Route>();

pages.forEach((page) => {
  pagesMap.set(page.path, page as Route);
});

if (Array.isArray(subPackages) && subPackages.length) {
  subPackages.forEach((el) => {
    const rootPath = el.root;
    el.pages.forEach((page) => {
      page.path = rootPath + '/' + page.path;
      pagesMap.set(page.path, page as Route);
    });
  });
}

export { pagesMap };
