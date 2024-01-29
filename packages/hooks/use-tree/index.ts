import { Ref } from "vue";
import { ElTree } from "element-plus";

interface TreeData {
  id: number;
  label: string;
  children?: TreeData[];
}

type DesTree = Ref<typeof ElTree>;

export const useTree = (treeRef: DesTree, treeData: TreeData[]) => {
  const flatTree = (columns: TreeData[], flatArr: Array<number> = []) => {
    columns.forEach((col) => {
      flatArr.push(col.id);
      if (col.children?.length) {
        flatArr.push(...flatTree(col.children));
      }
    });
    return flatArr;
  };
  // 展开收缩
  const handleExpandOrRetract = (value: boolean) => {
    let nodesMap = treeRef.value!.store.nodesMap;
    for (let key in nodesMap) {
      nodesMap[key].expanded = value;
    }
  };
  // 全选取消全选
  const handleSelectAll = (value: boolean) => {
    if (value) {
      let ids = flatTree(treeData);
      treeRef.value!.setCheckedKeys(ids);
    } else {
      treeRef.value!.setCheckedNodes([]);
    }
  };
  // 筛选过滤
  const filterNode = (value: string, data: TreeData) => {
    if (!value) return true;
    return data.label.includes(value);
  };
  return {
    handleExpandOrRetract,
    handleSelectAll,
    filterNode,
    flatTree
  };
};

export default useTree;
