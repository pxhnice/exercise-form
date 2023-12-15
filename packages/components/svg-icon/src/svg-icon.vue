<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { svgIconProps } from "./svg-icon";

defineOptions({ name: "ex-svg-icon" });
const props = defineProps(svgIconProps);

const iconName = computed(() => `#icon-${props.name}`);
const svgClass = computed(() => {
  return props.className ? `svg-icon ${props.className}` : "svg-icon";
});
</script>
<style>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentcolor;
  vertical-align: middle;
  color: inherit;
  outline: none;
}
</style>
