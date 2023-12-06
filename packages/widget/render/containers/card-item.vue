<template>
  <el-card
    class="ex-drag-card"
    :style="{ width: widgetData.options.cardWidth }"
    v-bind="widgetData.options"
  >
    <template #header>
      <div class="ex-card-header">
        <span>{{ widgetData.options.label }}</span>
      </div>
    </template>
    <div class="ex-card-body">
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
  </el-card>
</template>

<script setup lang="ts">
import { renContainerProps } from "./container";

defineProps(renContainerProps);
</script>

<style lang="scss" scoped>
.ex-drag-card {
  padding: 2px;
  margin: 3px 0;
}

.ex-card-body {
  width: 100%;
  min-height: 20px;
}

.ex-card-header {
  padding: 10px;
  text-align: left;
}
:deep(.el-card__header) {
  padding: 0px;
}
</style>
