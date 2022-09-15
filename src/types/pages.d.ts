export interface Pages extends Record<string, any> {
  path: string;
  meta?: {
    ignoreAuth?: boolean;
  };
  style: {
    navigationBarTitleText: string;
    [key: string]: string;
  };
}

export interface SubPackages {
  root: string;
  pages: Pages[];
}
