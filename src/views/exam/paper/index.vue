<script setup lang="ts">
import { Plus, Refresh, Search, Download } from "@element-plus/icons-vue";
import { computed, onMounted, reactive, ref } from "vue";
import { useDivisionStore } from "@/store/modules/divisions";
import { deleteCategoryReq, ICategory } from "@/api/examCategory";
import { ElMessageBox } from "element-plus";
import { message } from "@/utils/message";
import editDialog from "./editDialog.vue";

const divisionStore = useDivisionStore();

defineOptions({
  name: "ExamPaper"
});

const templateOneRef = ref(null);
const templateTwoRef = ref(null);
const tableData = ref([]);

const paginationConfig = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 10
});

/** 请求表格数据 */
const getList = async () => {
  // try {
  //   const reqData: ICategoryPageParams = {
  //     name: formInline.name || undefined,
  //     currentPage: paginationConfig.currentPage || 1,
  //     pageSize: paginationConfig.pageSize || 10
  //   };
  //   const res = await getExamCategoryListReq(reqData);
  //   console.log("获取考试分类成功", res);
  //   paginationConfig.total = res.totalRow;
  //   tableData.value = res.records;
  // } catch (e) {
  //   console.log("获取考试分类失败", e);
  //   message("获取考试分类列表失败", { type: "error" });
  // }
};

const formInline = reactive({
  name: "",
  area: ["11", "1101"],
  status: undefined
});

/** 点击重置 */
const onReset = () => {
  formInline.name = "";
  formInline.area = ["11", "1101"];
  formInline.status = undefined;
  getList();
};

const editDialogRef = ref(null);
const handleAddAndUpdate = (type: string, row?: ICategory) => {
  if (type === "add") {
    editDialogRef.value.open(type);
  } else if (type === "update") {
    editDialogRef.value.open(type, row);
  }
};

const handleEditExamTopics = () => {
  console.log("编辑考试题目");
};

const handleDelete = (id: number) => {
  ElMessageBox.confirm("删除操作不可逆，确认删除？", "注意", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    try {
      await deleteCategoryReq(id);
      message("删除成功", { type: "success" });
      await getList();
    } catch (e) {
      message("删除失败", { type: "error" });
      console.log("删除失败", e);
    }
  });
};

onMounted(() => {
  // 初始化省市列表
  const divisionStore = useDivisionStore();
  divisionStore.getDivisions();
  // 初始化表格
  getList();
});
</script>

<template>
  <div>
    <el-card class="mb-[24px]" shadow="never">
      <el-form class="mb-[-18px] form-inline" :inline="true" :model="formInline">
        <el-form-item label="省市选择">
          <el-cascader
            v-model="formInline.area"
            :options="divisionStore.divisionOptions"
            clearable
            placeholder="请选择省市"
          />
        </el-form-item>
        <el-form-item label="试卷名称">
          <el-input v-model="formInline.name" clearable placeholder="请输入试卷名称" />
        </el-form-item>
        <el-form-item label="上下架状态">
          <el-select v-model="formInline.status" clearable placeholder="请选择上下架状态">
            <el-option label="上架" value="ENABLED" />
            <el-option label="下架" value="DISABLED" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="getList()">搜索</el-button>
          <el-button :icon="Refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <div class="mb-[12px]">
        <el-button type="primary" :icon="Plus" @click="handleAddAndUpdate('add')">新增试卷</el-button>
        <el-button type="success" plain :icon="Download">导入试卷</el-button>
        <el-button :icon="Download" @click="templateOneRef.click()">下载导入模板1</el-button>
        <el-button :icon="Download" @click="templateTwoRef.click()">下载导入模板2</el-button>
        <a
          ref="templateOneRef"
          style="width: 0; height: 0"
          href="/templateFile/客观题答题模版.xlsx"
          download="客观题答题模版.xlsx"
        />
        <a
          ref="templateTwoRef"
          style="width: 0; height: 0"
          href="/templateFile/岗位上传模版.xlsx"
          download="岗位上传模版.xlsx"
        />
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" align="center" width="100px">
          <template #default="{ $index }">
            {{ $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="试卷名称" align="center" />
        <el-table-column prop="name" label="所属省份" align="center" />
        <el-table-column prop="name" label="所属城市" align="center" />
        <el-table-column prop="type" label="所属分类" align="center" />
        <el-table-column prop="name" label="是否上架" align="center" />
        <el-table-column fixed="right" label="操作" align="center" width="180px">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleAddAndUpdate('update', row)">编辑</el-button>
            <el-button link type="primary" @click="handleEditExamTopics">配置试题</el-button>
            <el-button link type="danger" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:page-size="paginationConfig.pageSize"
        v-model:current-page="paginationConfig.currentPage"
        class="mt-[12px] justify-end"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginationConfig.total"
        @change="getList"
      />
    </el-card>

    <editDialog :ref="editDialogRef" @update:table-data="getList" />
  </div>
</template>

<style lang="scss" scoped>
.form-inline .el-input {
  --el-input-width: 220px;
}

.form-inline .el-select {
  --el-select-width: 220px;
}
</style>
