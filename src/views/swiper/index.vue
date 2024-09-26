<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { Search, Refresh, Plus, View } from "@element-plus/icons-vue";
import reviewDialog from "./reviewDialog.vue";
import editDialog from "./editDialog.vue";
import { ElMessageBox } from "element-plus";
import { message } from "@/utils/message";
import { deleteSwiperReq, getSwiperListReq, ISwiperListParams } from "@/api/swiper";
import { IMAGE_BASE_URL } from "@/config/app";

defineOptions({
  name: "SwiperIndex"
});

/** 表格数据 */
const tableData = ref([]);

const paginationConfig = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 10
});

/** 请求表格数据 */
const getList = async () => {
  try {
    const reqData: ISwiperListParams = {
      name: formInline.name || undefined,
      status: formInline.status || undefined,
      currentPage: paginationConfig.currentPage || 1,
      pageSize: paginationConfig.pageSize || 10
    };
    const res = await getSwiperListReq(reqData);
    console.log("获取轮播图成功", res);
    paginationConfig.total = res.totalRow;
    tableData.value = res.records;
  } catch (e) {
    console.log("获取轮播图失败", e);
    message("获取轮播图列表失败", { type: "error" });
  }
};

/** 搜索表单 */
const formInline = reactive({
  name: "",
  status: ""
});

/** 点击重置 */
const onReset = () => {
  formInline.name = "";
  formInline.status = "";
  getList();
};

/** 点击查看轮播图 */
const reviewDialogRef = ref(null);
const handleReviewSlides = () => {
  reviewDialogRef.value.open();
};

/** 点击新增和更新 */
const editDialogRef = ref(null);
const handleAddAndUpdate = (type: string, id?: number) => {
  if (type === "add") {
    editDialogRef.value.open(type);
  } else if (type === "update") {
    editDialogRef.value.open(type, id);
  }
};

/** 点击删除 */
const handleDelete = (id: number) => {
  ElMessageBox.confirm("删除操作不可逆，确认删除？", "注意", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    try {
      await deleteSwiperReq(id);
      message("删除成功", { type: "success" });
      await getList();
    } catch (e) {
      message("删除失败", { type: "error" });
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
        <el-form-item label="图片名称">
          <el-input v-model="formInline.name" placeholder="请输入图片名称" clearable />
        </el-form-item>
        <el-form-item label="上下架状态">
          <el-select v-model="formInline.status" placeholder="请选择上下架状态">
            <el-option label="上架" value="ENABLED" />
            <el-option label="下架" value="DISABLED" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="getList">搜索</el-button>
          <el-button :icon="Refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <div class="mb-[12px]">
        <el-button type="primary" :icon="Plus" @click="handleAddAndUpdate('add')">新增轮播图</el-button>
        <el-button :icon="View" @click="handleReviewSlides">效果预览</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" align="center" width="100px">
          <template #default="{ $index }">
            {{ $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="图片名称" align="center" />
        <el-table-column label="图片" align="center">
          <template #default="{ row }">
            <el-image style="width: 100px; height: 100px" :src="`${IMAGE_BASE_URL}/${row.imageId}`" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column label="上下架状态" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.status === 1" type="success">已上架</el-tag>
            <el-tag v-if="row.status === 0" type="info">已下架</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="180px">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleAddAndUpdate('update', row.id)">编辑</el-button>
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

    <reviewDialog ref="reviewDialogRef" />
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
