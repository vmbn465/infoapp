declare interface Router extends Record<string, any> {
  path: string;
  meta?: {
    auth?: boolean;
  };
}

declare interface TabBar extends Record<string, any> {
  list: Router[];
}
