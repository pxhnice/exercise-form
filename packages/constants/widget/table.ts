export type DesTableColumns = {
  align: string;
  columnsId: number;
  children?: DesTableColumns[];
  format?: string;
  headerFlag?: boolean;
  label: string;
  minWidth?: number;
  prop: string;
  render?: string;
  show?: boolean;
  sortable?: boolean;
};

export const tableColumns: DesTableColumns[] = [
  {
    align: "center",
    columnsId: 1,
    label: "姓名",
    minWidth: 100,
    prop: "username",
    show: true,
    sortable: true
  },
  {
    align: "center",
    columnsId: 3,
    label: "年龄",
    minWidth: 100,
    show: true,
    prop: "age",
    sortable: true
  },
  {
    align: "center",
    columnsId: 4,
    label: "生日",
    minWidth: 120,
    prop: "birth",
    show: true,
    sortable: true
  },
  {
    align: "center",
    columnsId: 5,
    label: "电话",
    minWidth: 120,
    prop: "phone",
    show: true,
    sortable: true
  },
  {
    align: "center",
    columnsId: 6,
    label: "邮箱",
    minWidth: 150,
    prop: "email",
    show: true,
    sortable: true
  },
  {
    align: "center",
    columnsId: 7,
    label: "地址",
    minWidth: 200,
    prop: "address",
    show: true,
    sortable: true
  },
  {
    align: "center",
    columnsId: 8,
    children: [
      {
        align: "center",
        columnsId: 9,
        headerFlag: true,
        label: "表头2",
        prop: "~",
        children: [
          {
            align: "center",
            columnsId: 10,
            label: "列1",
            minWidth: 100,
            prop: "col1",
            show: true,
            sortable: true
          },
          {
            align: "center",
            columnsId: 11,
            label: "列2",
            minWidth: 100,
            prop: "col2",
            show: true,
            sortable: true
          }
        ]
      }
    ],
    headerFlag: true,
    label: "表头1",
    prop: "~",
    show: true
  }
];

export const tableData = [
  {
    id: 1,
    username: "张三",
    birth: "2006-09-18 02:39:56",
    IDCard: "230000200009206339",
    email: "l.mxvotnawh@qq.com",
    age: 26,
    phone: "14757938316",
    address: "内蒙古自治区-阜新市-漠河县"
  },
  {
    id: 2,
    username: "李四",
    birth: "2006-09-18 02:39:56",
    IDCard: "230000200009206339",
    email: "l.mxvotnawh@qq.com",
    age: 28,
    phone: "15006177705",
    address: "内蒙古自治区-阜新市-漠河县"
  },
  {
    id: 3,
    username: "王麻子",
    birth: "2006-09-18 02:39:56",
    IDCard: "230000200009206339",
    email: "l.mxvotnawh@qq.com",
    age: 30,
    phone: "19671165911",
    address: "内蒙古自治区-阜新市-漠河县"
  }
];

export const operationButtons = [
  {
    disabled: false,
    hidden: true,
    label: "编辑",
    name: "edit",
    round: false,
    size: "small",
    text: true,
    type: "default"
  },
  {
    disabled: false,
    hidden: true,
    label: "删除",
    name: "delete",
    round: false,
    size: "small",
    text: true,
    type: "default"
  }
];
