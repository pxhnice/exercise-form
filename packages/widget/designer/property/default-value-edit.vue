<template>
  <div>
    <el-form-item label="默认值">
      <component
        :is="`el-${settingData.type}`"
        v-model="optionsModel.modelDefaultValue"
        :type="optionsModel.type"
        :multiple="optionsModel.multiple"
        :format="optionsModel.format"
        :value-format="optionsModel.valueFormat"
        :is-range="optionsModel.isRange"
        clearable
      >
        <template v-if="settingData.type === 'select'">
          <el-option
            v-for="item in optionsModel.optionsItem"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </template>
      </component>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
