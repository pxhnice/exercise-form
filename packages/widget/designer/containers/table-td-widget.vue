<template>
  <td
    class="ex-widget-td"
    :class="{ 'ex-is-drag': isSelect }"
    v-bind="widgetData.options"
    @click.stop="onClickCol"
  >
    <div style="width: 100%; height: 100%">
      <draggable
        group="componentsGroup"
        ghost-class="ex-ghost"
        handle=".drag-mover"
        class="container-draggable"
        :disabled="isDrag"
        :list="widgetData.children"
        item-key="id"
        :animation="300"
        @add="onDragAdd($event, widgetData)"
      >
        <template #item="{ element, index }">
          <div class="ex-widget-td_content">
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
      <div v-if="isSelect">
        <div class="ex-title">{{ widgetData.name }}</div>
        <div class="ex-operation-row">
          <el-icon
            title="选中父组件"
            class="ex-mgr-10"
            @click.stop="handleParentChecked"
            :size="16"
          >
            <ex-icon-arrow-left />
          </el-icon>
          <el-tooltip effect="light" placement="bottom" trigger="click">
            <el-icon
              title="单元格操作"
              class="ex-mgr-10"
              @click.stop
              :size="16"
            >
              <ex-icon-all />
            </el-icon>
            <template #content>
              <div class="ex-widget-td_buttons">
                <el-button link @click.stop="insertLeftCol">
                  插入左列
                </el-button>
                <el-button link @click.stop="insertRightCol">
                  插入右列
                </el-button>
                <el-button link @click.stop="insertUpRow"> 插入上行 </el-button>
                <el-button link @click.stop="insertDownRow">
                  插入下行
                </el-button>
                <el-divider />
                <el-button
                  link
                  :disabled="isMergeLeft"
                  @click.stop="mergeLeftCell"
                >
                  合并左侧单元格
                </el-button>
                <el-button
                  link
                  :disabled="isMergeRight"
                  @click.stop="mergeRightCell"
                >
                  合并右侧单元格
                </el-button>
                <el-button link :disabled="isMergeCol" @click.stop="mergeRow">
                  合并整行
                </el-button>
                <el-divider />
                <el-button link :disabled="isUpMerge" @click.stop="mergeUpCell">
                  合并上单元格
                </el-button>
                <el-button
                  link
                  :disabled="isDownMerge"
                  @click.stop="mergeDownCell"
                >
                  合并下单元格
                </el-button>
                <el-button link :disabled="isMergeRow" @click.stop="mergeCol">
                  合并整列
                </el-button>
                <el-divider />
                <el-button
                  link
                  :disabled="isRevocationRow"
                  @click.stop="revocationMerge"
                >
                  撤销列合并
                </el-button>
                <el-button
                  link
                  :disabled="isRevocationCol"
                  @click.stop="revocationMerge"
                >
                  撤销行合并
                </el-button>
                <el-divider />
                <el-button link :disabled="isMergeRow" @click.stop="delCol">
                  删除整列
                </el-button>
                <el-button link :disabled="isMergeCol" @click.stop="delRow">
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
import type { DesWidget } from "@exercise-form/constants";
import { desContainerProps } from "./container";

const props = defineProps(desContainerProps);

const dragTarget = props.designer.dragTarget;
const isDrag = computed(() =>
  ["popup-box", "side-drawer"].includes(dragTarget.value.type)
);
const isSelect = computed(
  () => props.designer.selectWidgetId.value == props.widgetData.id
);

const onDragAdd = (e: any, parent: DesWidget) => {
  let i = e.newIndex;
  if (parent.children) {
    props.designer.setSelectWidget(parent.children[i]);
    props.designer.emitHistoryChange();
  }
};

const onClickCol = () => {
  props.designer.setSelectWidget(props.widgetData);
};

const handleParentChecked = () => {
  props.designer.setSelectWidget(props.parentData);
};

const isMergeLeft = computed(() => {
  return (
    props.widgetSub <= 0 ||
    props.colList[props.widgetSub - 1].options.rowspan !==
      props.widgetData.options.rowspan
  );
});

const isMergeRight = computed(() => {
  let rightColIndex = props.widgetSub + props.widgetData.options.colspan;
  return (
    props.widgetSub >= props.colLength - 1 ||
    rightColIndex > props.colLength - 1 ||
    props.colList[rightColIndex].options.rowspan !==
      props.widgetData.options.rowspan
  );
});

const isUpMerge = computed(() => {
  let options: { [key: string]: any } = {};
  let widgetTarget = props.parentList[props.widgetRow - 1];
  if (widgetTarget) {
    let children = widgetTarget.children;
    if (children) options = children[props.widgetSub].options;
  }
  return (
    props.widgetRow <= 0 || options.colspan !== props.widgetData.options.colspan
  );
});

const isDownMerge = computed(() => {
  let options: { [key: string]: any } = {};
  let belowRowIndex = props.widgetRow + props.widgetData.options.rowspan;
  let widgetTarget = props.parentList[belowRowIndex];
  if (widgetTarget) {
    let children = widgetTarget.children;
    if (children) {
      options = children[props.widgetSub].options;
    }
  }
  return (
    props.widgetRow >= props.rowLength - 1 ||
    belowRowIndex > props.rowLength - 1 ||
    options.colspan !== props.widgetData.options.colspan
  );
});

const isMergeRow = computed(() => {
  return (
    props.colLength <= 1 || props.colLength === props.widgetData.options.colspan
  );
});

const isMergeCol = computed(() => {
  return (
    props.rowLength <= 1 || props.rowLength === props.widgetData.options.rowspan
  );
});

const isRevocationRow = computed(() => {
  let { rowspan } = props.widgetData.options;
  return rowspan == 1;
});

const isRevocationCol = computed(() => {
  let { colspan } = props.widgetData.options;
  return colspan == 1;
});

const insertRightCol = () => {
  props.designer.insertCell(props.parentList, props.widgetSub, "right");
};

const insertLeftCol = () => {
  props.designer.insertCell(props.parentList, props.widgetSub, "left");
};

const insertUpRow = () => {
  props.designer.insertRow(props.parentList, props.widgetRow, "up");
};

const insertDownRow = () => {
  props.designer.insertRow(props.parentList, props.widgetRow, "down");
};

const mergeRightCell = () => {
  props.designer.mergeRightCell(
    props.parentList,
    props.widgetData,
    props.widgetRow,
    props.widgetSub
  );
};

const mergeLeftCell = () => {
  props.designer.mergeLeftCell(
    props.parentList,
    props.widgetData,
    props.widgetRow
  );
};

const mergeUpCell = () => {
  props.designer.mergeUpCell(
    props.parentList,
    props.widgetData,
    props.widgetRow,
    props.widgetSub
  );
};

const mergeDownCell = () => {
  props.designer.mergeDownCell(
    props.parentList,
    props.widgetData,
    props.widgetRow,
    props.widgetSub
  );
};

const mergeRow = () => {
  props.designer.mergeEntireRow(props.parentList, props.widgetRow);
};

const mergeCol = () => {
  props.designer.mergeEntireCol(props.parentList, props.widgetSub);
};

const revocationMerge = () => {
  props.designer.revocationMerge(
    props.parentList,
    props.widgetData,
    props.widgetRow,
    props.widgetSub
  );
};

const delRow = () => {
  props.designer.deleteEntireRow(props.parentList, props.widgetRow);
};

const delCol = () => {
  props.designer.deleteEntireCol(props.parentList, props.widgetRow);
};
</script>
