<template>
  <table class="drag-table" v-bind="widgetData.options">
    <tbody>
      <tr class="drag-tr" v-for="row in widgetData.children" :key="row.id">
        <template v-for="cell in row.children" :key="cell.id">
          <td v-if="cell.merged">
            <template v-for="item in cell.children">
              <template v-if="item.category === 'container'">
                <component
                  :is="`${item.type}-item`"
                  :designer="designer"
                  :widget-data="item"
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
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { renContainerProps } from "./container";

defineProps(renContainerProps);
</script>
