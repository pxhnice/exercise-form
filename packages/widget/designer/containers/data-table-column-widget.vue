<template>
  <!-- 多级头 -->
  <template v-if="cols.children">
    <el-table-column
      :label="cols.label"
      :width="cols.width"
      :align="cols.align"
    >
      <data-table-column-widget
        v-for="(child, index) in cols.children"
        :key="index"
        :cols="child"
      />
    </el-table-column>
  </template>
  <el-table-column
    v-else
    v-bind="cols"
    :fixed="cols.fixed != '' ? cols.fixed : undefined"
    :align="cols.align"
  >
    <template #default="{ row, $index }">
      <component
        v-if="cols.render"
        :is="cols.render"
        :row="row"
        :index="$index"
      />
      <slot
        v-else-if="cols.slot"
        :name="cols.prop"
        :row="row"
        :index="$index"
      ></slot>
      <span v-else>{{ row[cols.prop] }}</span>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup>
defineProps({
  cols: {
    type: Object,
    default() {
      return {};
    }
  }
});
</script>
<style lang="scss" scoped>
.content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>
