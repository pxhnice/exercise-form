<template>
  <button class="ex-button" :class="buttonStyle">
    <slot />
    <el-input v-model="moduleV1"></el-input>
  </button>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { ElInput } from "element-plus";
defineOptions({ name: "ex-button" });
type ButtonProps = {
  type?: string;
};
const moduleV1 = ref(11);
const buttonProps = defineProps<ButtonProps>();
const buttonStyle = computed(() => {
  return { [`ex-button-${buttonProps.type}`]: buttonProps.type };
});
</script>
<style>
@import "../style/index.scss";
</style>
