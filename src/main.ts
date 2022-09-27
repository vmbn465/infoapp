import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/state';
import '@/assets/style/main.scss';

/* import fontawesome icon */
import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import '@fortawesome/fontawesome-free/scss/brands.scss';
import '@fortawesome/fontawesome-free/scss/solid.scss';
import '@fortawesome/fontawesome-free/scss/regular.scss';

export function createApp() {
  const app = createSSRApp(App);

  // Configure store
  setupStore(app);

  return {
    app,
  };
}
