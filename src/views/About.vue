<template>
  <div class="about">
    <h1>This is an about page</h1>

    <button @click="handleClick">fetch Category</button>

    <Test cLabel="select" v-model="value" filterable placeholder="请选择" @change="handleChange">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </Test>

    <Test cLabel="cascader" cIs="el-cascader" placeholder="试试搜索：指南" :options="options1" filterable></Test>

    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <!-- <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      ref="tree"
      highlight-current
      :props="{
        children: 'children',
        label: 'label'
      }"
      :filter-node-method="filterNode">
    </el-tree>-->

    <el-button @click="visible = true">{{ visible }}</el-button>

    <el-dialog :visible="visible" append-to-body>
      <el-select v-model="type" @change="handleSelectChange">
        <el-option label="fetch" value="1"></el-option>
      </el-select>

      <el-select v-model="value">
        <el-option v-for="item in Object.keys(results)" :key="item" :label="item" :value="item"></el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-button @click="openDialog">openDialog</el-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Test from "@/components/Test.js";
import data from "../../public/med_tree.json";
import { debounce } from "lodash";
/* import InfiniteTree from "infinite-tree"; */
import "infinite-tree/dist/infinite-tree.css";
/* import ElTree from "@/components/ElTreeExtend.vue"; */

export default {
  name: "about",
  components: {
    Test
    /* ElTree, */
  },
  data() {
    Object.assign(this, {
      data: data.body[0].children,
      options1: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ]
    });

    return {
      filterText: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      visible: false,
      type: ""
    };
  },
  computed: {
    ...mapState(["category", "results"])
  },
  watch: {
    filterText() {
      this.debouncedFilter();
    }
  },
  mounted() {
    this.debouncedFilter = debounce(this.filter, 500);
  },
  methods: {
    openDialog() {
      this.dialog =
        this.dialog ||
        this.$dialog({
          props: {
            title: "hello dialog",
            center: true,
            "custom-class": "c__dialog",
            "before-close": function(done) {
              console.log("before-close");
              setTimeout(() => done(), 2000);
            }
          },
          children: {
            content: () => import("@/components/DialogContent"),
            footer: () => import("@/components/DialogFooter")
          },
          event: {
            open() {
              console.log("open");
            },
            opened() {
              console.log("opened");
            },
            close() {
              console.log("close");
            },
            closed() {
              console.log("closed");
            }
          }
        });

      this.dialog.open();
    },
    handleClick() {
      this.$store.dispatch("fetchCategory", 1);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    filter() {
      this.$refs.tree.filter(this.filterText);
    },
    handleChange(value) {
      console.log(value);
    },
    handleSelectChange(value) {
      this.$store.dispatch("fetchCategory", value);
    }
  }
};
</script>
