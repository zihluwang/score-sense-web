<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { Search, Refresh, Plus } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { message } from "@/utils/message";
import editDialog from "./editDialog.vue";
import { deleteCategoryReq, getExamCategoryListReq, ICategory, ICategoryPageParams } from "@/api/examCategory";

defineOptions({
  name: "CategoryIndex"
});

const tableData = ref([]);

const paginationConfig = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 10
});

/** 请求表格数据 */
const getList = async () => {
  try {
    const reqData: ICategoryPageParams = {
      name: formInline.name || undefined,
      currentPage: paginationConfig.currentPage || 1,
      pageSize: paginationConfig.pageSize || 10
    };
    const res = await getExamCategoryListReq(reqData);
    console.log("获取考试分类成功", res);
    paginationConfig.total = res.totalRow;
    tableData.value = res.records;
  } catch (e) {
    console.log("获取考试分类失败", e);
    message("获取考试分类列表失败", { type: "error" });
  }
};

const formInline = reactive({
  id: "",
  name: ""
});

/** 点击重置 */
const onReset = () => {
  formInline.name = "";
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
  // 初始化表格
  getList();
});
</script>

<template>
  <div>
    <el-card class="mb-[24px]" shadow="never">
      <el-form class="mb-[-18px] form-inline" :inline="true" :model="formInline">
        <el-form-item label="分类名称">
          <el-input v-model="formInline.name" placeholder="请输入标签名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="getList()">搜索</el-button>
          <el-button :icon="Refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <div class="mb-[12px]">
        <el-button type="primary" :icon="Plus" @click="handleAddAndUpdate('add')">新增分类</el-button>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" align="center" width="100px">
          <template #default="{ $index }">
            {{ $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="分类名称" align="center" />
        <el-table-column fixed="right" label="操作" align="center" width="180px">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleAddAndUpdate('update', row)">编辑</el-button>
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
