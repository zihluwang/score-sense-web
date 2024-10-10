<script setup lang="ts">
import { message } from "@/utils/message";
import { ElMessageBox } from "element-plus";
import { ref, reactive, onMounted } from "vue";
import { Search, Refresh, Plus, Download } from "@element-plus/icons-vue";
import editDialog from "./editDialog.vue";
import importDialog from "./importDialog.vue";
import useDivisions from "@/hooks/useDivisions";
import { deleteJobReq, getJobListReq, IJobListItem, IJobListReqParams } from "@/api/jobPosition";

const { getDivisionList, getProvinceName, getPrefectureName, divisionOptions } = useDivisions();

defineOptions({
  name: "JopPositionIndex"
});

const tableData = ref([]);

const paginationConfig = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 10
});

const formInline = reactive({
  area: undefined,
  name: undefined,
  examId: undefined
});

/** 请求表格数据 */
const getList = async () => {
  try {
    const reqData: IJobListReqParams = {
      currentPage: paginationConfig.currentPage || 1,
      pageSize: paginationConfig.pageSize || 10,
      examId: formInline.examId || undefined,
      name: formInline.name || undefined,
      divisionCode: formInline.area ? formInline?.area[1] : undefined
    };
    const res = await getJobListReq(reqData);
    console.log("获取岗位列表成功", res);
    paginationConfig.total = res.totalRow;
    tableData.value = res.records.map(item => {
      return {
        ...item,
        provinceName: getProvinceName(item.province),
        prefectureName: getPrefectureName(item.prefecture)
      };
    });
  } catch (e) {
    console.log("获取岗位列表失败", e);
    message("获取岗位列表失败", { type: "error" });
  }
};

/** 点击重置 */
const onReset = () => {
  formInline.name = undefined;
  formInline.area = undefined;
  formInline.examId = undefined;
  paginationConfig.currentPage = 1;
  getList();
};

const editDialogRef = ref(null);
const handleAddAndUpdate = (type: string, row?: IJobListItem) => {
  if (type === "add") {
    editDialogRef.value.open(type);
  } else if (type === "update") {
    editDialogRef.value.open(type, row);
  }
};

const handleDelete = (id: number) => {
  ElMessageBox.confirm("删除操作不可逆，确认删除？", "注意", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    try {
      await deleteJobReq(id);
      message("删除成功", { type: "success" });
      await getList();
    } catch (e) {
      message("删除失败", { type: "error" });
      console.log("删除失败", e);
    }
  });
};

const importDialogRef = ref(null);
const handleImport = () => {
  console.log(importDialogRef.value);
  importDialogRef.value.open();
};

onMounted(async () => {
  // 初始化省市列表
  await getDivisionList();
  // 初始化考试类型
  // await getAllExamTypes();
  // 初始化表格
  await getList();
});
</script>

<template>
  <div>
    <el-card class="mb-[24px]" shadow="never">
      <el-form class="mb-[-18px] form-inline" :inline="true" :model="formInline">
        <el-form-item label="省市选择">
          <el-cascader v-model="formInline.area" :options="divisionOptions" clearable placeholder="请选择省市" />
        </el-form-item>
        <el-form-item label="岗位名称">
          <el-input v-model="formInline.name" placeholder="请输入岗位名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="getList">搜索</el-button>
          <el-button :icon="Refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <div class="mb-[12px]">
        <el-button type="primary" :icon="Plus" @click="handleAddAndUpdate('add')">新增岗位</el-button>
        <el-button type="primary" plain :icon="Download" @click="handleImport">导入试卷</el-button>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" align="center" width="100px">
          <template #default="{ $index }">
            {{ $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="岗位名称" align="center" />
        <el-table-column prop="provinceName" label="所属省份" align="center" />
        <el-table-column prop="prefectureName" label="所属城市" align="center" />
        <el-table-column fixed="right" label="操作" align="center" width="180px">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleAddAndUpdate('update', row)">编辑</el-button>
            <el-button link type="primary">配置试卷</el-button>
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

    <editDialog ref="editDialogRef" @update:table-data="getList" />
    <importDialog ref="importDialogRef" @update:table-data="getList" />
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
