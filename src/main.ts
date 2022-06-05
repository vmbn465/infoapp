import { createSSRApp } from 'vue';
import App from './App.vue';
import 'virtual:windi.css';
import { setupInterceptors } from '@/utils/interceptors';

setupInterceptors();
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
