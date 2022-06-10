import { createSSRApp } from 'vue';
import App from './App.vue';
import 'virtual:windi.css';
import { setupInterceptors } from '@/utils/interceptors';
import { setupStore } from '@/state';

setupInterceptors();

export function createApp() {
  const app = createSSRApp(App);

  // Configure store
  setupStore(app);

  return {
    app,
  };
}
