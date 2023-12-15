<template>
  <div>
    <el-divider> 栅格列设置 </el-divider>
    <el-form-item label="栅格间隙">
      <el-input-number
        style="width: 100%"
        v-model="optionsModel.gutter"
        :min="0"
      />
    </el-form-item>
    <el-form-item label="当前栅格列" />
    <el-form-item label-width="0">
      <ul class="ex-property-row">
        <li
          class="ex-property-col ex-mgb-10"
          v-for="(col, index) in settingData.children"
          :key="col.id"
        >
          <span class="ex-property-col_title">栅格宽度{{ index + 1 }}</span>
          <el-input-number
            class="ex-property-col_put"
            v-model="col.options.span"
            :min="1"
            :max="24"
          />
          <el-button
            @click="handelDel(index)"
            class="ex-mgl-10"
            icon="Minus"
            type="danger"
            plain
            circle
          />
        </li>
      </ul>
      <el-button style="padding: 0px" @click="handelAdd" type="primary" link>
        添加栅格列
      </el-button>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { desPropertyProps } from "../property";

const props = defineProps(desPropertyProps);

const handelAdd = () => {
  props.designer.copyContainerWidget(props.settingData);
};

const handelDel = (index: number) => {
  // props.optionsModel.children.splice(index, 1);
};
</script>
