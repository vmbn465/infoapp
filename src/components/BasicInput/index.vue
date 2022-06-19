<template>
  <input :type="type" v-bind="$attrs" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'BasicInput',
    props: {
      type: {
        type: String,
        default: 'text',
      },
    },
    setup(props) {
      const test = 'Test';
      return { test };
    },
  });
</script>

<style lang="scss" scoped></style>
