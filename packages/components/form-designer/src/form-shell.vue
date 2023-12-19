<template>
  <div id="ex-designer">
    <template v-if="isShow">
      <slot></slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps({
  callBackFn: Function
});

const isShow = ref(false);
// 减慢构建器组件加载，处理主题渲染
onMounted(() => {
  if (props.callBackFn) props.callBackFn();
  isShow.value = true;
});
</script>
