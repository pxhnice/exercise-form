<template>
  <div class="ex-data-source">
    <ul class="ex-data-source_list">
      <li v-for="(item, index) of 10" :key="index">
        <div class="ex-data-source_icon">
          <el-icon><UploadFilled /></el-icon>
        </div>
        <el-divider direction="vertical" />
        <div class="ex-data-source_content">标题{{ item }}</div>
        <el-button
          class="ex-data-source_edit"
          type="primary"
          icon="Edit"
          size="small"
          circle
        />
        <el-button
          class="ex-data-source_delete"
          type="danger"
          icon="Delete"
          size="small"
          circle
        />
      </li>
    </ul>
    <el-button-group class="ex-data-source_operation">
      <el-button type="primary" @click="showAddData = true" plain icon="Plus">
        新增数据源
      </el-button>
      <el-button
        type="primary"
        @click="showImportData = true"
        plain
        icon="BottomLeft"
      />
      <el-button
        type="primary"
        @click="showExportData = true"
        plain
        icon="TopRight"
      />
    </el-button-group>
    <el-dialog
      v-model="showAddData"
      width="800"
      title="数据源设置"
      @close="cancel"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="1.请求配置">
          <ex-code-editor v-model="code" :dark="dark" lang="json" />
        </el-tab-pane>
        <el-tab-pane label="2.数据处理">
          <ex-code-editor v-model="code" :dark="dark" lang="json" />
        </el-tab-pane>
        <el-tab-pane label="3.错误处理">
          <ex-code-editor v-model="code" :dark="dark" lang="json" />
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <div class="ex-data-source_button">
          <el-button type="primary" @click="showTestData = true">
            测试数据源
          </el-button>
          <div>
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="handleAddConfirm">
              确认
            </el-button>
          </div>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="showImportData"
      width="800"
      title="导入数据"
      @close="cancel"
      destroy-on-close
      draggable
      :close-on-click-modal="false"
    >
      <el-alert
        class="ex-data-source_alert"
        title="导入的数据源格式须符合规范，以保证顺利导入"
        show-icon
        :closable="false"
        type="info"
      />
      <ex-code-editor v-model="code" :dark="dark" lang="json" />
      <el-switch
        v-model="switchValue"
        size="default"
        active-text="追加到已有数据源之后"
        inactive-text="导入后清空源数据源"
      />
      <template #footer>
        <el-button type="primary" @click="handleImportConfirm">
          导入
        </el-button>
        <el-button @click="cancel">关闭</el-button>
      </template>
    </el-dialog>
    <el-dialog
      v-model="showExportData"
      width="800"
      title="导出数据"
      @close="cancel"
      destroy-on-close
      draggable
      :close-on-click-modal="false"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="选择导出数据源">
          <el-scrollbar height="300px">
            <ul class="ex-data-source_list">
              <li v-for="(item, index) of 5" :key="index">
                <div class="ex-data-source_icon">
                  <el-icon><UploadFilled /></el-icon>
                </div>
                <el-divider direction="vertical" />
                <div class="ex-data-source_content">标题{{ item }}</div>
                <el-checkbox
                  v-model="checked"
                  label="导出选中"
                  size="default"
                />
              </li>
            </ul>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="导出结果预览">
          <ex-code-editor v-model="code" :dark="dark" lang="json" />
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <el-button type="primary" @click="handleExportConfirm">
          复制JSON
        </el-button>
        <el-button @click="cancel">关闭</el-button>
      </template>
    </el-dialog>
    <el-dialog
      v-model="showTestData"
      width="800"
      title="测试数据源"
      @close="cancel"
      destroy-on-close
      draggable
      :close-on-click-modal="false"
    >
      <el-alert
        class="ex-data-source_alert"
        title="数据源变量"
        type="info"
        :closable="false"
      />
      <ex-code-editor v-model="code" height="150" :dark="dark" lang="json" />
      <div
        style="justify-content: flex-end; margin: 10px 0"
        class="ex-data-source_operation"
      >
        <el-button type="primary" @click="handleExecute"> 立即执行 </el-button>
        <el-button type="primary" plain @click="handleClear"> 清空 </el-button>
        <el-button @click="handleClose">关闭</el-button>
      </div>
      <el-alert
        class="ex-data-source_alert"
        title="返回数据"
        type="info"
        :closable="false"
      />
      <ex-code-editor v-model="code" :dark="dark" lang="json" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { darkKeys } from "../form-designer";

const dark = inject(darkKeys);

const showAddData = ref(false);
const showImportData = ref(false);
const showExportData = ref(false);
const showTestData = ref(false);
const code = ref();
const switchValue = ref();
const checked = ref();

const handleAddConfirm = () => {
  showAddData.value = false;
};

const handleImportConfirm = () => {
  showImportData.value = false;
};

const handleExportConfirm = () => {
  showExportData.value = false;
};

const handleExecute = () => {};

const handleClear = () => {};

const handleClose = () => {
  showTestData.value = false;
};

const cancel = () => {
  showAddData.value = false;
  showImportData.value = false;
  showExportData.value = false;
  showTestData.value = false;
};
</script>

<style lang="scss" scoped>
.ex-data-source {
  width: 100%;
  padding-bottom: 50px;
  .ex-data-source_operation {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .ex-data-source_list {
    width: 100%;
    list-style: none;
    padding: 0px;
    li {
      position: relative;
      display: flex;
      background: var(--el-fill-color);
      padding: 10px 5px;
      font-size: 12px;
      margin-bottom: 20px;
      align-items: center;
      border-radius: 5px;
      .ex-data-source_content {
        flex: 1;
      }
      .ex-data-source_icon {
        display: flex;
        width: 30px;
        justify-content: center;
        align-items: center;
      }
      .ex-data-source_edit {
        position: absolute;
        top: -10px;
        right: 50px;
      }
      .ex-data-source_delete {
        position: absolute;
        top: -10px;
        right: 10px;
      }
    }
  }
  .ex-data-source_alert {
    border-radius: 5px 5px 0 0 !important;
  }
  :deep(.el-tabs__content) {
    padding: 0;
  }
  :deep(.el-dialog__footer) {
    text-align: center;
  }
  .ex-data-source_button {
    display: flex;
    justify-content: space-between;
  }
}
</style>
