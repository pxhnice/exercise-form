<template>
  <td
    class="ex-drag-td"
    :class="{ 'ex-is-drag': isSelect }"
    v-bind="widgetData.options"
    @click.stop="onClickCol"
  >
    <draggable
      group="componentsGroup"
      ghost-class="ghost"
      handle=".drag-mover"
      class="container-draggable"
      :list="widgetData.children"
      item-key="id"
      :animation="300"
      @add="onDragAdd($event, widgetData)"
    >
      <template #item="{ element, index }">
        <div class="ex-drag-container">
          <template v-if="element.category === 'container'">
            <component
              :is="`${element.type}-widget`"
              :designer="designer"
              :widget-data="element"
              :parent-data="widgetData"
              :parent-list="widgetData.children"
              :widget-sub="index"
              :key="element.id"
            />
          </template>
          <template v-else>
            <form-item-widget
              :designer="designer"
              :widget-data="element"
              :parent-data="widgetData"
              :parent-list="widgetData.children"
              :widget-sub="index"
              :key="element.id"
            />
          </template>
        </div>
      </template>
    </draggable>
    <div v-if="isSelect" class="ex-form-operation">
      <div class="title">{{ widgetData.name }}</div>
      <div class="operation-row">
        <div title="选中父组件">
          <ex-svg-icon
            @click.stop="handleParentChecked"
            class="ft"
            name="arrow-left"
          />
        </div>
        <div title="单元格操作">
          <el-tooltip effect="light" placement="bottom" trigger="click">
            <ex-svg-icon @click.stop class="ft" name="all" />
            <template #content>
              <div class="td-btns">
                <el-button link class="btn" @click.stop="insertLeftCol">
                  插入左列
                </el-button>
                <el-button link class="btn" @click.stop="insertRightCol">
                  插入右列
                </el-button>
                <el-button link class="btn" @click.stop="insertUpRow">
                  插入上行
                </el-button>
                <el-button link class="btn" @click.stop="insertDownRow">
                  插入下行
                </el-button>
                <el-divider class="mgr" />
                <el-button
                  link
                  :disabled="isMergeLeft"
                  class="btn"
                  @click.stop="mergeLeftCell"
                >
                  合并左侧单元格
                </el-button>
                <el-button
                  link
                  :disabled="isMergeRight"
                  class="btn"
                  @click.stop="mergeRightCell"
                >
                  合并右侧单元格
                </el-button>
                <el-button
                  link
                  :disabled="isMergeCol"
                  class="btn"
                  @click.stop="mergeRow"
                >
                  合并整行
                </el-button>
                <el-divider class="mgr" />
                <el-button
                  link
                  :disabled="isUpMerge"
                  class="btn"
                  @click.stop="mergeUpCell"
                >
                  合并上单元格
                </el-button>
                <el-button
                  link
                  :disabled="isDownMerge"
                  class="btn"
                  @click.stop="mergeDownCell"
                >
                  合并下单元格
                </el-button>
                <el-button
                  link
                  :disabled="isMergeRow"
                  class="btn"
                  @click.stop="mergeCol"
                >
                  合并整列
                </el-button>
                <el-divider class="mgr" />
                <el-button
                  link
                  :disabled="isBackoutRow"
                  class="btn"
                  @click.stop="revocationMerge"
                >
                  撤销列合并
                </el-button>
                <el-button
                  link
                  :disabled="isBackoutCol"
                  class="btn"
                  @click.stop="revocationMerge"
                >
                  撤销行合并
                </el-button>
                <el-divider class="mgr" />
                <el-button
                  link
                  :disabled="isMergeRow"
                  class="btn"
                  @click.stop="delCol"
                >
                  删除整列
                </el-button>
                <el-button
                  link
                  :disabled="isMergeCol"
                  class="btn"
                  @click.stop="delRow"
                >
                  删除整行
                </el-button>
              </div>
            </template>
          </el-tooltip>
        </div>
      </div>
    </div>
  </td>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type {
  PropsWidgetType,
  WidgetConfigType
} from "@exercise-form/components/form-designer/src/designer";

interface TdPropsWidgetType extends PropsWidgetType {
  colList: WidgetConfigType[];
  widgetRow: number;
  colLength: number;
  rowLength: number;
}

const props = withDefaults(defineProps<TdPropsWidgetType>(), {
  widgetRow: 0,
  widgetSub: 0
});

let { designer, parentList, parentData, widgetData } = props;

const isSelect = computed(
  () => designer.selectWidgetId.value == props.widgetData.id
);

const onDragAdd = (e: any, parent: WidgetConfigType) => {
  let i = e.newIndex;
  if (parent.children) {
    designer.setSelectWidget(parent.children[i]);
  }
};

const onClickCol = () => {
  designer.setSelectWidget(widgetData);
};

const handleParentChecked = () => {
  designer.setSelectWidget(parentData);
};

const isMergeLeft = computed(() => {
  return (
    props.widgetSub <= 0 ||
    props.colList[props.widgetSub - 1].options.rowspan !==
      widgetData.options.rowspan
  );
});

const isMergeRight = computed(() => {
  let rightColIndex = props.widgetSub + widgetData.options.colspan;
  return (
    props.widgetSub >= props.colLength - 1 ||
    rightColIndex > props.colLength - 1 ||
    props.colList[rightColIndex].options.rowspan !== widgetData.options.rowspan
  );
});

const isUpMerge = computed(() => {
  return (
    props.widgetRow <= 0 ||
    parentList[props.widgetRow - 1].children[props.widgetSub].options
      .colspan !== widgetData.options.colspan
  );
});

const isDownMerge = computed(() => {
  let belowRowIndex = props.widgetRow + widgetData.options.rowspan;
  return (
    props.widgetRow >= props.rowLength - 1 ||
    belowRowIndex > props.rowLength - 1 ||
    parentList[belowRowIndex].children[props.widgetSub].options.colspan !==
      widgetData.options.colspan
  );
});

const isMergeRow = computed(() => {
  return props.colLength <= 1 || props.colLength === widgetData.options.colspan;
});

const isMergeCol = computed(() => {
  return props.rowLength <= 1 || props.rowLength === widgetData.options.rowspan;
});

const isBackoutRow = computed(() => {
  let { rowspan } = widgetData.options;
  return rowspan == 1;
});

const isBackoutCol = computed(() => {
  let { colspan } = widgetData.options;
  return colspan == 1;
});

const insertRightCol = () => {
  designer.insertCell(parentList, props.widgetSub, "right");
};

const insertLeftCol = () => {
  designer.insertCell(parentList, props.widgetSub, "left");
};

const insertUpRow = () => {
  designer.insertRow(parentList, props.widgetRow, "up");
};

const insertDownRow = () => {
  designer.insertRow(parentList, props.widgetRow, "down");
};

const mergeRightCell = () => {
  designer.mergeRightCell(
    parentList,
    widgetData,
    props.widgetRow,
    props.widgetSub
  );
};

const mergeLeftCell = () => {
  designer.mergeLeftCell(parentList, widgetData, props.widgetRow);
};

const mergeUpCell = () => {
  designer.mergeUpCell(
    parentList,
    widgetData,
    props.widgetRow,
    props.widgetSub
  );
};

const mergeDownCell = () => {
  designer.mergeDownCell(
    parentList,
    widgetData,
    props.widgetRow,
    props.widgetSub
  );
};

const mergeRow = () => {
  designer.mergeEntireRow(parentList, props.widgetRow);
};

const mergeCol = () => {
  designer.mergeEntireCol(parentList, props.widgetSub);
};

const revocationMerge = () => {
  designer.revocationMerge(
    parentList,
    widgetData,
    props.widgetRow,
    props.widgetSub
  );
};

const delRow = () => {
  designer.deleteEntireRow(parentList, props.widgetRow);
};

const delCol = () => {
  designer.deleteEntireCol(parentList, props.widgetRow);
};
</script>

<style lang="scss" scoped>
.ex-drag-td {
  position: relative;
  border: 1px dashed var(--el-color-primary);
  margin: 0px !important;
  padding: 2px;
  word-break: break-all;
  height: 40px;
}

.ex-drag-container {
  margin: 3px 0;
}

.ex-form-operation {
  // width: 100%;
  // height: 100%;
  .title,
  .operation-row {
    position: absolute;
    padding: 5px;
    color: #fff;
  }

  .title {
    top: 0;
    left: 0;
    // cursor: move;
    z-index: 1;
  }

  .title::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: var(--el-color-primary);
    opacity: 0.8;
    z-index: -1;
  }

  .operation-row {
    display: flex;
    right: 0;
    bottom: 0;
    align-items: center;
    background-color: var(--el-color-primary);
  }

  .ft {
    font-size: 16px;
    margin: 0 2px;
    color: #fff;
  }
}

.td-btns {
  display: flex;
  flex-direction: column;
  padding: 0 10px;

  .btn {
    display: inline-block;
    text-align: left;
    font-size: 13px;
    margin: 0px;
    padding: 5px;
  }

  .btn:hover {
    color: var(--el-color-primary);
  }

  .mgr {
    margin: 5px 0;
  }
}

.ex-is-drag {
  border: 2px solid var(--el-color-primary);
}
</style>
