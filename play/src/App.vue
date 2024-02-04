<template>
  <div class="home">
    <el-header class="demo-header">
      <div class="demo-header-box">
        <img class="ex-mgr-10" src="./assets/svg/logo.svg" alt="" />
        <span class="name ex-mgr-10">Exercise Form 表单构建器</span>
        <span class="ver">V0.0.0-dev.1</span>
      </div>
      <div class="demo-header-box">
        <div class="ex-mgr-10">
          <span>主题色：</span>
          <el-color-picker v-model="color" @change="changColor" />
        </div>
        <div>
          <span>黑夜模式：</span>
          <el-switch
            v-model="dark"
            @change="changDark"
            active-action-icon="Moon"
            inactive-action-icon="Sunny"
          />
        </div>
        <div class="ex-mgl-10">
          <el-link
            @click="
              to('https://pxhnice.github.io/exercise-form-docs.github.io/')
            "
          >
            文档
            <el-icon style="margin-left: 5px" :size="20"><Coin /></el-icon>
          </el-link>
        </div>
        <div>
          <el-icon
            class="ex-mgl-10"
            @click="to('https://gitee.com/pxhgood/exercise-form.git')"
            :size="25"
          >
            <ex-icon-github-fill />
          </el-icon>
        </div>
      </div>
    </el-header>
    <ex-form-designer
      style="flex: 1"
      :dark="dark"
      :form-data="formData"
      :form-json="formJson"
      :template-list="templateList"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { templateList } from "./constants/temp";
import { cutNight, cutColor } from "./utils/theme";
import { localStorageUtils } from "../../packages/utils/storage";

let storage = localStorageUtils();

const dark = ref(false);
const color = ref("#409eff");
const formData = ref({});
const formJson = reactive({
  formConfig: {},
  widgetList: []
});

const changDark = (value: boolean) => {
  cutNight(value);
};

const changColor = (value: string) => {
  if (value) {
    cutColor(value);
  } else {
    cutColor("#409EFF");
  }
};

const to = (url: string) => {
  window.open(url, "_blank");
};

onMounted(() => {
  let isNight = storage.get("ex-dark") as boolean;
  let themeColor = storage.get("ex-theme-color") as string;
  dark.value = isNight ?? false;
  color.value = themeColor ?? "#409EFF";
  changDark(dark.value);
  changColor(color.value);
});
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
    font-size: 14px;
    .demo-header-box {
      display: flex;
      align-items: center;
      img {
        width: 25px;
        height: 25px;
      }
      .logo {
        font-size: 25px;
      }
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
