<template>
  <div>
    <el-radio-group v-model="groupValue" class="ex-radio-group">
      <el-radio-button style="flex: 1" label="zj">组件设置</el-radio-button>
      <el-radio-button style="flex: 1" label="bd">表单设置</el-radio-button>
    </el-radio-group>
    <div class="ex-widget-container">
      <div class="ex-widget-container-box">
        <el-scrollbar class="ex-widget-box-scrollbar">
          <el-form
            v-if="groupValue == 'bd'"
            :model="formConfig"
            size="small"
            label-width="130px"
            label-position="left"
          >
            <el-collapse v-model="activeNames">
              <el-collapse-item title="基本属性" name="1">
                <el-form-item label="全局组件大小">
                  <el-select v-model="formConfig.size">
                    <el-option label="large" value="large" />
                    <el-option label="default" value="default" />
                    <el-option label="small" value="small" />
                  </el-select>
                </el-form-item>
                <el-form-item label="标签位置">
                  <el-radio-group v-model="formConfig.labelPosition">
                    <el-radio-button label="left">左边</el-radio-button>
                    <el-radio-button label="top">顶部</el-radio-button>
                    <el-radio-button label="right">右边</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="字段标签对齐">
                  <el-radio-group v-model="formConfig.align">
                    <el-radio-button label="left">居左</el-radio-button>
                    <el-radio-button label="center">居中</el-radio-button>
                    <el-radio-button label="right">居右</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="是否隐藏必填字段">
                  <el-switch v-model="formConfig.hideRequiredAsterisk" />
                </el-form-item>
                <el-form-item label="标签宽度">
                  <el-input-number v-model="formConfig.labelWidth" :min="1" />
                </el-form-item>
                <el-form-item label="表单全局CSS">
                  <el-button
                    @click="handelCsstCode('cssCode')"
                    type="primary"
                    icon="Edit"
                    round
                  >
                    编写样式
                  </el-button>
                </el-form-item>
                <el-form-item label="自定义CSS样式">
                  <el-select v-model="formConfig.customClass" multiple>
                    <el-option
                      v-for="css in globalCss"
                      :key="css"
                      :label="css"
                      :value="css"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="表单全局函数">
                  <el-button
                    @click="handelFunctiontCode('functions')"
                    type="primary"
                    icon="Edit"
                    round
                  >
                    编写代码
                  </el-button>
                </el-form-item>
                <el-divider> 生成SFC设置 </el-divider>
                <el-form-item label="数据对象名称">
                  <el-input v-model="formConfig.modelName" />
                </el-form-item>
                <el-form-item label="引用名称">
                  <el-input v-model="formConfig.formName" />
                </el-form-item>
                <el-form-item label="验证规则名称">
                  <el-input v-model="formConfig.rulesName" />
                </el-form-item>
              </el-collapse-item>
              <el-collapse-item title="事件属性" name="2">
                <el-form-item label="onFormCreated">
                  <el-button
                    @click="handelEventCode('onFormCreated')"
                    type="primary"
                    icon="Edit"
                    round
                  >
                    编写代码
                  </el-button>
                </el-form-item>
                <el-form-item label="onFormMounted">
                  <el-button
                    @click="handelEventCode('onFormMounted')"
                    type="primary"
                    icon="Edit"
                    round
                  >
                    编写代码
                  </el-button>
                </el-form-item>
                <el-form-item label="onFormDataChange">
                  <el-button
                    @click="handelEventCode('onFormDataChange')"
                    type="primary"
                    icon="Edit"
                    round
                  >
                    编写代码
                  </el-button>
                </el-form-item>
              </el-collapse-item>
            </el-collapse>
          </el-form>
          <el-form
            v-else
            ref="formComRef"
            :model="selectWidget"
            size="small"
            label-width="130px"
            label-position="left"
          >
            <el-collapse v-model="activeNames">
              <el-collapse-item title="基本属性" name="1">
                <template
                  v-for="(name, nameEdit) in COMMON_PROPERTIES"
                  :key="name"
                >
                  <component
                    v-if="hasPropName(nameEdit)"
                    :is="name"
                    :designer="designer"
                    :setting-data="selectWidget"
                    :optionsModel="selectWidget.options"
                  />
                </template>
              </el-collapse-item>
              <el-collapse-item
                v-if="hideCollapseEvent()"
                title="事件属性"
                name="2"
              >
                <template
                  v-for="(name, nameEdit) in EVENT_PROPERTIES"
                  :key="name"
                >
                  <component
                    v-if="hasPropName(nameEdit)"
                    :is="name"
                    :designer="designer"
                    :setting-data="selectWidget"
                    :event-name="nameEdit"
                  />
                </template>
              </el-collapse-item>
            </el-collapse>
          </el-form>
        </el-scrollbar>
      </div>
    </div>
    <el-dialog
      v-model="isShowEvent"
      width="800"
      :title="title"
      @close="cancel"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <div class="box">
        <div class="name-front">{{ firstName }}</div>
        <ex-code-editor v-model="code" />
        <div class="name-back">{{ lastName }}</div>
      </div>
      <template #footer>
        <span>
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="isShowFunction"
      width="800"
      :title="title"
      @close="cancel"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <ex-code-editor v-model="code" />
      <template #footer>
        <span>
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="isShowCss"
      width="800"
      :title="title"
      @close="cancel"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <ex-code-editor v-model="code" lang="css" />
      <template #footer>
        <span>
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { COMMON_PROPERTIES, EVENT_PROPERTIES } from "@exercise-form/constants";
import "../../style/index.scss";

const formConfig: any = {};
const selectWidget: any = ref({});
const designer: any = {};

const groupValue = ref("bd");
const activeNames = ref(["1", "2"]);
const isShowEvent = ref(false);
const isShowCss = ref(false);
const isShowFunction = ref(false);
const code = ref("");
const title = ref("");
const fnName = ref("");
const codeName = ref("");
const globalCss = computed(() => {
  // let str = props.formConfig.cssCode.replaceAll("\n", "");
  // let rules = str.match(/[^.]+(?={)|[^.]+(?=,)/g) ?? [];
  // rules = rules.map((item: any) => item.trim()) as RegExpMatchArray;
  // rules = Array.from(new Set([...rules])) as RegExpMatchArray;
  return [];
});
const firstName = computed(() => {
  return fnName.value.slice(0, fnName.value.length - 1);
});
const lastName = computed(() => {
  return fnName.value.slice(-1);
});

const formComRef = ref();
const hideCollapseEvent = () => {
  let options = selectWidget.value.options || {};
  for (const key in EVENT_PROPERTIES) {
    if (key in options) {
      return true;
    }
  }
  return false;
};

const hasPropName = (name: string) => {
  if (!name) return false;
  let options = selectWidget.value.options || {};
  if (name in options) {
    return true;
  } else {
    return false;
  }
};

const handelEventCode = (name: string) => {
  // code.value = props.formConfig[name];
  fnName.value = `${name}(){}`;
  codeName.value = name;
  title.value = "表单处理事件函数";
  isShowEvent.value = true;
};

const handelFunctiontCode = (name: string) => {
  // code.value = props.formConfig[name];
  codeName.value = name;
  title.value = "表单全局函数";
  isShowFunction.value = true;
};

const handelCsstCode = (name: string) => {
  // code.value = props.formConfig[name];
  codeName.value = name;
  title.value = "表单全局样式";
  isShowCss.value = true;
};

const confirm = () => {
  // props.formConfig[codeName.value] = code.value;
  cancel();
};

const cancel = () => {
  code.value = "";
  isShowEvent.value = false;
  isShowFunction.value = false;
  isShowCss.value = false;
};
</script>
