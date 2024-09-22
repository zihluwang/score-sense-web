<script setup lang="ts">
import { reactive, ref } from "vue";
import { Search, Refresh, Plus } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { message } from "@/utils/message";

defineOptions({
  name: "CategoryIndex"
});

const tableData = ref([
  {
    id: 1,
    name: "最新",
    status: 1,
    createTime: "2024-09-22 00:00:00",
    updateTime: "2024-09-23 00:00:00"
  },
  {
    id: 2,
    name: "公务员",
    status: 2,
    createTime: "2024-09-22 00:00:00",
    updateTime: "2024-09-23 00:00:00"
  },
  {
    id: 3,
    name: "事业单位",
    status: 2,
    createTime: "2024-09-22 00:00:00",
    updateTime: "2024-09-23 00:00:00"
  },
  {
    id: 4,
    name: "教师",
    status: 2,
    createTime: "2024-09-22 00:00:00",
    updateTime: "2024-09-23 00:00:00"
  },
  {
    id: 5,
    name: "军队文职",
    status: 1,
    createTime: "2024-09-22 00:00:00",
    updateTime: "2024-09-23 00:00:00"
  },
  {
    id: 6,
    name: "医疗",
    status: 1,
    createTime: "2024-09-22 00:00:00",
    updateTime: "2024-09-23 00:00:00"
  },
  {
    id: 7,
    name: "研究生",
    status: 1,
    createTime: "2024-09-22 00:00:00",
    updateTime: "2024-09-23 00:00:00"
  },
  {
    id: 8,
    name: "选调生",
    status: 1,
    createTime: "2024-09-22 00:00:00",
    updateTime: "2024-09-23 00:00:00"
  },
  {
    id: 9,
    name: "公安招警",
    status: 1,
    createTime: "2024-09-22 00:00:00",
    updateTime: "2024-09-23 00:00:00"
  },
  {
    id: 10,
    name: "遴选",
    status: 1,
    createTime: "2024-09-22 00:00:00",
    updateTime: "2024-09-23 00:00:00"
  },
  {
    id: 11,
    name: "国企",
    status: 1,
    createTime: "2024-09-22 00:00:00",
    updateTime: "2024-09-23 00:00:00"
  },
  {
    id: 12,
    name: "三支一扶",
    status: 1,
    createTime: "2024-09-22 00:00:00",
    updateTime: "2024-09-23 00:00:00"
  },
  {
    id: 13,
    name: "书记员",
    status: 1,
    createTime: "2024-09-22 00:00:00",
    updateTime: "2024-09-23 00:00:00"
  },
  {
    id: 14,
    name: "六项人员",
    status: 1,
    createTime: "2024-09-22 00:00:00",
    updateTime: "2024-09-23 00:00:00"
  }
]);

const formInline = reactive({
  user: "",
  status: 0,
  date: ""
});

const onSubmit = () => {
  console.log("submit!");
};

// const reviewDialogRef = ref(null);
// const handleReviewSlides = () => {
//   const pics: string[] = tableData.value.filter(item => item.status === 1).map(item => item.link);
//   reviewDialogRef.value.open(pics);
// };

const editDialogRef = ref(null);
const handleAddAndUpdate = (type: string, id?: number) => {
  if (type === "add") {
    editDialogRef.value.open(type);
  } else if (type === "update") {
    editDialogRef.value.open(type, id);
  }
};

const handleDelete = (id: number) => {
  ElMessageBox.confirm("删除操作不可逆，确认删除？", "注意", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    tableData.value.splice(
      tableData.value.findIndex(item => item.id === id),
      1
    );
    message("登录成功", { type: "success" });
  });
};
</script>

<template>
  <div>
    <el-card class="mb-[24px]" shadow="never">
      <el-form class="mb-[-18px] form-inline" :inline="true" :model="formInline">
        <el-form-item label="标签名称">
          <el-input v-model="formInline.user" placeholder="请输入标签名称" clearable />
        </el-form-item>
        <el-form-item label="上下架状态">
          <el-select v-model="formInline.status" placeholder="请选择上下架状态">
            <el-option label="全部" :value="0" />
            <el-option label="上架" :value="1" />
            <el-option label="下架" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="formInline.date"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD"
            time-format="HH:mm:ss"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="onSubmit">搜索</el-button>
          <el-button :icon="Refresh" @click="onSubmit">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <div class="mb-[12px]">
        <el-button type="primary" :icon="Plus" @click="handleAddAndUpdate('add')">新增标签</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" align="center" width="100px">
          <template #default="{ $index }">
            {{ $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="标签名称" align="center" />
        <el-table-column prop="status" label="上下架状态" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.status === 1" type="success">已上架</el-tag>
            <el-tag v-if="row.status === 2" type="info">已下架</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <el-table-column prop="updateTime" label="最近更新时间" align="center" />
        <el-table-column fixed="right" label="操作" align="center" width="180px">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleAddAndUpdate('update', row.id)">编辑</el-button>
            <el-button link type="danger" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="mt-[12px] justify-end"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="1000"
      />
    </el-card>
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
