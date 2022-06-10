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
      <button @tap="submit">login</button>
      {{ loginType }}
      <view>{{ token }}---</view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { request } from '@/utils/http/index';
  import { useUserStore } from '@/state/modules/user';
  const form = reactive({
    email: 'catch@admin.com',
    password: 'catchadmin',
  });
  const loginType = ref('');
  const token = ref<string>('');
  const userStore = useUserStore();
  const submit = () => {
    userStore.login(form);
    // request
    //   .post('/login', form)
    //   .then((res: any) => {
    //     loginType.value = '登录成功';
    //     console.log(res);
    //     userStore.setToken(res.data.token);
    //     token.value = userStore.getToken;
    //   })
    //   .catch((err: any) => {
    //     loginType.value = '登录失败';
    //     console.log(err.message);
    //   });
  };
</script>

<style lang="scss" scoped></style>
