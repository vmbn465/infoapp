<template>Test Component-----{{ msg }}</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Test',
    setup() {
      const msg = 'sdfa';
      return {
        msg,
      };
    },
  });
</script>
<style scoped lang="scss"></style>
