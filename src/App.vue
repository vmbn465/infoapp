<script setup lang="ts">
import { onHide, onLaunch, onShow } from "@dcloudio/uni-app";
import { useAuthStore } from "@/state/modules/auth";
import { onMounted } from "vue";
import { useRouter } from "uni-mini-router";

const router = useRouter();
onLaunch(() => {
	console.log('App Launch');
});
onShow(() => {
	const authStore = useAuthStore();
	authStore.initToken();
    authStore.initUserInfo();
    // const userStore=useUserStore();
    // userStore.init();
	console.log('App Show');
});
onHide(() => {
	console.log('App Hide');
});
onMounted(() => {

	uni.onTabBarMidButtonTap(() => {
		router.push({ path: "pages/addDynamic/index" });
		console.log("点击了中间按钮");
	})
})
</script>
<style lang="scss">
	@import '@/assets/main.scss';
	@import "@/uni_modules/uview-plus/index.scss";

</style>