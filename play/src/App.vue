<template>
  <div class="home">
    <el-header class="demo-header">
      <div class="demo-header-box">
        <img
          style="width: 25px; height: 25px"
          class="ex-mgr-10"
          src="../static/logo.svg"
          alt=""
        />
        <span class="name ex-mgr-10">ExForm 表单构建器</span>
        <span class="ver">V0.0.0-dev.1</span>
      </div>
      <div class="demo-header-box">
        <div class="ex-mgr-10">
          <span>主题色：</span>
          <el-color-picker v-model="color" />
        </div>
        <div>
          <span>黑夜模式：</span>
          <el-switch
            v-model="dark"
            active-action-icon="Moon"
            inactive-action-icon="Sunny"
          />
        </div>
        <div>
          <ex-svg-icon
            @click="toGit"
            style="font-size: 25px"
            class="ex-mgl-10"
            name="github-fill"
          />
        </div>
      </div>
    </el-header>
    <ex-form-designer
      style="flex: 1"
      :dark="dark"
      :theme-color="color"
      :form-data="formData"
      :form-json="formJson"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
const dark = ref(false);
const color = ref("#0a6f91");
const formData = ref({});
const formJson = reactive({
  formConfig: {
    size: "default",
    labelPosition: "left",
    align: "left",
    labelWidth: 90,
    modelName: "formData",
    formName: "formRef",
    rulesName: "rules",
    patternType: "pc",
    isPageType: "page",
    hideRequiredAsterisk: false,
    cssCode: "",
    customClass: []
  },
  widgetList: [
    {
      name: "栅格",
      iconName: "grid",
      category: "container",
      type: "grid",
      children: [
        {
          name: "栅格列",
          iconName: "",
          type: "grid-col",
          category: "container",
          children: [],
          options: {
            customClass: "",
            hidden: false,
            name: "grid-col_bnny8",
            span: 12,
            offset: 0,
            push: 0,
            pull: 0
          },
          id: "grid-col_bnny8"
        },
        {
          name: "栅格列",
          iconName: "",
          type: "grid-col",
          category: "container",
          children: [],
          options: {
            customClass: "",
            hidden: false,
            name: "grid-col_uj6t7",
            span: 12,
            offset: 0,
            push: 0,
            pull: 0
          },
          id: "grid-col_uj6t7"
        }
      ],
      options: {
        colHeight: "",
        customClass: "",
        gutter: 10,
        hidden: false,
        name: "gridxa6vh",
        style: {
          minHeight: "40px"
        }
      },
      id: "gridxa6vh"
    }
  ]
});

const toGit = () => {
  window.open("https://gitee.com/pxhgood/exercise-form.git", "_blank");
};
</script>
<style>
html,
body {
  height: 100%;
  margin: 0;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .demo-header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    .demo-header-box {
      display: flex;
      align-items: center;
      .name {
        font-size: 18px;
        font-weight: bold;
      }
      .ver {
        font-size: 16px;
        color: #989898;
      }
    }
  }
}
</style>
