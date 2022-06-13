import { createSSRApp } from 'vue';
import App from './App.vue';
import 'virtual:windi.css';
import { setupStore } from '@/state';

export function createApp() {
  const app = createSSRApp(App);

  // Configure store
  setupStore(app);

  return {
    app,
  };
}
