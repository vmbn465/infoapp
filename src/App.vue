<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import { useAuthStore } from '@/state/modules/auth';
import { onMounted } from 'vue';
onLaunch(() => {
    console.log('App Launch');
});
onShow(() => {
    const authStore = useAuthStore();
    authStore.initToken();
    console.log('App Show');
});
onHide(() => {
    console.log('App Hide');
});
onMounted(()=>{
	uni.onTabBarMidButtonTap(()=>{
		console.log("点击了中间按钮");
	})
	
})
</script>
<style lang="scss">
@import '@/assets/main.scss';
@import "@/uni_modules/uview-plus/index.scss";
</style>
