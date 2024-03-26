<template>
  <div>
    <template v-for="item in widgetData.children" :key="item.id">
      <template v-if="item.category === 'container'">
        <component
          :is="`${item.type}-item`"
          :widget-data="item"
          :designer="designer"
          :form-data="formData"
          :key="item.id"
        />
      </template>
      <template v-else>
        <form-item
          :designer="designer"
          :widget-data="item"
          :form-data="formData"
          :key="item.id"
        />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { renContainerProps } from "./container";

defineProps(renContainerProps);
</script>
