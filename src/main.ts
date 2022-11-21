import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/state';
import '@/assets/style/main.scss';
import '@/components/FontAwesomeIcon/index.scss';
import '@purge-icons/generated';
import 'uno.css';

export function createApp() {
  const app = createSSRApp(App);

  // Configure store
  setupStore(app);

  return {
    app,
  };
}
