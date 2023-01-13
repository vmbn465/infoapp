// 解决 无法找到模块 'uview-plus' 的声明文件，参考：https://blog.csdn.net/qq1014156094/article/details/107316969
declare module 'uview-plus';

// 为 UniApp.Uni 扩展 $u 属性
declare namespace UniNamespace {
  export interface UniInterface {
    $u?: any;
  }
}
