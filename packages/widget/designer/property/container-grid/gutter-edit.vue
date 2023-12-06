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
      <ul class="row">
        <li
          class="col"
          v-for="(col, index) in settingData.children"
          :key="col.id"
        >
          <span class="col-title">栅格宽度{{ index + 1 }}</span>
          <el-input-number
            class="put"
            v-model="col.options.span"
            :min="1"
            :max="24"
          />
          <el-button
            @click="handelDel(index)"
            class="btn"
            icon="Minus"
            type="danger"
            plain
            circle
          />
        </li>
      </ul>
      <el-button
        style="padding: 0px"
        @click="handelAdd"
        class="btn"
        type="primary"
        link
      >
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

<style lang="scss" scoped>
.row {
  padding: 0px;
  .col {
    list-style: none;
    text-decoration: none;
    margin-bottom: 5px;
    .col-title {
      display: inline-block;
      width: 130px;
      font-size: 13px;
    }
    .put {
      width: 100px;
    }
    .btn {
      margin-left: 10px;
    }
  }
}
</style>
