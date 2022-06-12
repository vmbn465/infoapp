<template>
  <view class="container">
    <view>
      <label
        >邮箱:
        <input class="border border-gray-500" v-model="form.email" type="text" />
      </label>
      <label
        >密码:
        <input class="border border-gray-500" v-model="form.password" type="text" />
      </label>
      <button v-if="isLogin" @tap="loginOut">login out</button>
      <button v-else @tap="submit">login</button>
      {{ loginType }}
      <view>{{ token }}---</view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useAuthStore } from '@/state/modules/auth';
  const form = reactive({
    email: 'catch@admin.com',
    password: 'catchadmin',
  });
  const loginType = ref('');

  const authStore = useAuthStore();

  const token = ref<string | undefined>(authStore.getToken);
  const isLogin = ref<boolean>(authStore.isLogin);
  const submit = () => {
    authStore.login(form).then((res) => {
      token.value = res.token;
      isLogin.value = authStore.isLogin;
    });
  };
  const loginOut = () => {
    authStore.loginOut().then((res) => {
      token.value = res.token;
      isLogin.value = authStore.isLogin;
    });
  };
</script>

<style lang="scss" scoped></style>
