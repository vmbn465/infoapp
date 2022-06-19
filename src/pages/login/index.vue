<template>
  <view class="max-w-4/5 mx-auto py-36rpx text-center pt-280rpx">登录</view>
  <view class="shadow-lg max-w-4/5 mx-auto py-36rpx px-24rpx">
    <form class="form" @submit="submit">
      <label class="h-44px flex items-center border-0 border-b-3rpx border-solid border-blue-100">
        <view class="min-w-96rpx">邮箱:</view>
        <view class="flex-grow"><BasicInput name="email" :value="form.email" /></view>
      </label>
      <label class="h-44px flex items-center border-0 border-b-3rpx border-solid border-blue-100">
        <view class="min-w-96rpx">密码:</view>
        <view class="flex-grow"
          ><BasicInput type="password" name="password" :value="form.password"
        /></view>
      </label>
      <button
        form-type="submit"
        class="border-4rp mt-44rpx h-88rpx flex items-center justify-center border-solid border-blue-200 bg-blue-400 hover:bg-blue-500 text-xs text-light-100 hover:text-light-100"
        hover-class="none"
        >登录</button
      >
    </form>
  </view>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useAuthStore } from '@/state/modules/auth';
  import { onLoad } from '@dcloudio/uni-app';
  import BasicInput from '@/components/BasicInput/index.vue';
  import { Toast } from '@/utils/uniApi';
  import { router } from '@/utils/router';
  const redirect = ref<string | undefined>(undefined);
  onLoad((query) => {
    redirect.value = query.redirect || undefined;
  });

  const form = reactive({
    email: 'uni-app@test.com',
    password: 'Vue3_Ts_Vite',
  });
  const authStore = useAuthStore();
  const submit = (e: any) => {
    authStore.login(e.detail.value).then((res) => {
      Toast('登录成功', { duration: 1500 });
      setTimeout(() => {
        router.pushTab('/pages/about/index');
      }, 1500);
    });
  };
</script>

<style lang="scss" scoped></style>
