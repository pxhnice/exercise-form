<template>
  <div>
    <el-form-item label="操作按钮编辑">
      <el-button
        @click="isShowOperation = true"
        type="primary"
        icon="Edit"
        round
      >
        编辑
      </el-button>
    </el-form-item>
    <el-dialog
      width="1000"
      v-model="isShowOperation"
      v-bind="dialogOptions"
      title="操作按钮编辑"
      @close="cancel"
    >
      <el-form v-model="optionsModel">
        <el-scrollbar ref="scrollbarRef" max-height="300">
          <draggable
            :list="selectWidget.options.buttonGroups"
            handle=".pane-mover"
            item-key="id"
          >
            <template #item="{ element, index }">
              <div class="ex-data-table-operation">
                <el-row :gutter="10">
                  <el-col :span="1">
                    <el-icon class="pane-mover" :size="36">
                      <ex-icon-drag />
                    </el-icon>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="名称" required>
                      <el-input v-model="element.name" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="文字">
                      <el-input v-model="element.label" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="类型">
                      <el-select v-model="element.type">
                        <el-option label="default" value="" />
                        <el-option label="primary" value="primary" />
                        <el-option label="success" value="success" />
                        <el-option label="warning" value="warning" />
                        <el-option label="info" value="info" />
                        <el-option label="danger" value="danger" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="大小">
                      <el-select v-model="element.size">
                        <el-option value="large" label="large" />
                        <el-option value="default" label="default" />
                        <el-option value="small" label="small" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1"></el-col>
                  <el-col :span="3">
                    <el-form-item label="文字">
                      <el-switch
                        v-model="element.text"
                        @change="changeText($event, element)"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item label="链接">
                      <el-switch
                        v-model="element.link"
                        @change="changeLink($event, element)"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item label="圆角">
                      <el-switch
                        v-model="element.round"
                        @change="changeRound($event, element)"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item label="圆形">
                      <el-switch
                        v-model="element.circle"
                        @change="changeCircle($event, element)"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item label="禁用">
                      <el-switch v-model="element.disabled" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="点击事件" label-width="65">
                      <el-button
                        @click="
                          handleEventCode(element.onTableColumnClick, index)
                        "
                        size="small"
                        type="primary"
                        icon="Edit"
                        round
                      >
                        编写代码
                      </el-button>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-button
                      icon="Delete"
                      @click="handleDeleteButton(index)"
                      type="danger"
                      plain
                      circle
                    />
                  </el-col>
                </el-row>
              </div>
            </template>
          </draggable>
        </el-scrollbar>
        <el-button
          class="ex-mgt-10"
          type="primary"
          @click="handleAddButton"
          icon="Plus"
        >
          添加按钮
        </el-button>
      </el-form>
      <template #footer>
        <div style="display: flex; justify-content: center">
          <el-button size="default" @click="cancel">关闭</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="isShowEvent"
      width="800"
      title="按钮点击事件编辑"
      @close="handleEventCancel"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <div class="ex-dialog-box">
        <div class="name-front">onClick(row){</div>
        <ex-code-editor v-model="eventCode" :dark="dark" />
        <div class="name-back">}</div>
      </div>
      <template #footer>
        <span>
          <el-button size="default" @click="handleEventCancel">取消</el-button>
          <el-button size="default" type="primary" @click="handleConfirm">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, nextTick } from "vue";
import { ElScrollbar } from "element-plus";
import { desPropertyProps } from "../property";
import { getUniqueId } from "@exercise-form/utils";
import { DesButtonGroup } from "@exercise-form/constants";
import { darkKeys } from "@exercise-form/components/form-designer/src/form-designer";

const props = defineProps(desPropertyProps);

const dark = inject(darkKeys);
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();
const selectWidget = props.designer.selectWidget;
const isShowOperation = ref(false);
const dialogOptions = {
  draggable: true,
  destroyOnClose: true,
  closeOnClickModal: false
};
const eventCode = ref("");
const isShowEvent = ref(false);
const buttonSub = ref(-1);

const cancel = () => {
  isShowOperation.value = false;
};

const handleAddButton = () => {
  let name = getUniqueId();
  selectWidget.value.options?.buttonGroups.push({
    disabled: false,
    label: "new btn",
    link: false,
    name,
    round: false,
    size: "default",
    text: false,
    onClick: "",
    type: "",
    circle: false
  });
  nextTick(() => {
    let wrapRef = scrollbarRef.value!.wrapRef;
    scrollbarRef.value!.setScrollTop(wrapRef!.scrollHeight);
  });
};

const handleEventCode = (content: string, index: number) => {
  isShowEvent.value = true;
  eventCode.value = content;
  buttonSub.value = index;
};

const handleConfirm = () => {
  selectWidget.value.options.buttonGroups[buttonSub.value].onClick =
    eventCode.value;
  handleEventCancel();
};

const handleEventCancel = () => {
  isShowEvent.value = false;
  buttonSub.value = -1;
  eventCode.value = "";
};

const handleDeleteButton = (index: number) => {
  selectWidget.value.options?.buttonGroups.splice(index, 1);
};

const changeText = (value: boolean, element: DesButtonGroup) => {
  if (value) {
    element.link = false;
    element.round = false;
    element.circle = false;
  }
};

const changeLink = (value: boolean, element: DesButtonGroup) => {
  if (value) {
    element.text = false;
    element.round = false;
    element.circle = false;
  }
};

const changeRound = (value: boolean, element: DesButtonGroup) => {
  if (value) {
    element.link = false;
    element.text = false;
    element.circle = false;
  }
};

const changeCircle = (value: boolean, element: DesButtonGroup) => {
  if (value) {
    element.text = false;
    element.round = false;
    element.link = false;
  }
};
</script>
