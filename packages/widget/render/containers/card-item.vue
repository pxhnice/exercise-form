<template>
  <el-card
    class="ex-widget-card"
    :style="{ width: widgetData.options.cardWidth }"
    v-bind="widgetData.options"
  >
    <template #header>
      <div class="ex-widget-card_header">
        <span>{{ widgetData.options.label }}</span>
      </div>
    </template>
    <div class="ex-widget-card_body">
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
