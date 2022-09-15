<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
  import { useAuthStore } from '@/state/modules/auth';
  import { setupInterceptors } from '@/utils/interceptors';
  import { useAppStore } from '@/state/modules/app';

  onLaunch(() => {
    console.log('App Launch');
    setupInterceptors();
    const appStore = useAppStore();
    appStore.initialize();
  });
  onShow(() => {
    const authStore = useAuthStore();
    authStore.initToken();
    console.log('App Show');
  });
  onHide(() => {
    console.log('App Hide');
  });
</script>
<style lang="scss">
  page {
    background-color: #f2f2f2;
  }
</style>
