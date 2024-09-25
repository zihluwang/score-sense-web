<script setup lang="ts">
import { message } from "@/utils/message";
import { ElMessageBox } from "element-plus";
import { ref, reactive } from "vue";
import { Search, Refresh, Plus } from "@element-plus/icons-vue";
import editDialog from "./editDialog.vue";

defineOptions({
  name: "JopPositionIndex"
});

const tableData = ref([
  {
    id: 1,
    name: "宜秀区政协委员履职服务中心",
    code: "1604001"
  },
  {
    id: 2,
    name: "宜秀区党风廉政宣教中心",
    code: "1604002"
  },
  {
    id: 3,
    name: "宜秀区政协委员履职服务中心",
    code: "1604003"
  },
  {
    id: 4,
    name: "宜秀区党风廉政宣教中心",
    code: "1604004"
  },
  {
    id: 5,
    name: "宜秀区政协委员履职服务中心",
    code: "1604005"
  },
  {
    id: 6,
    name: "宜秀区党风廉政宣教中心",
    code: "1604006"
  },
  {
    id: 7,
    name: "宜秀区政协委员履职服务中心",
    code: "1604007"
  }
]);

const formInline = reactive({
  name: "",
  code: ""
});

const onSubmit = () => {
  console.log("submit!");
};

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
        <el-form-item label="岗位名称">
          <el-input v-model="formInline.name" placeholder="请输入岗位名称" clearable />
        </el-form-item>
        <el-form-item label="岗位代码">
          <el-input v-model="formInline.code" placeholder="请输入岗位代码" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="onSubmit">搜索</el-button>
          <el-button :icon="Refresh" @click="onSubmit">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <div class="mb-[12px]">
        <el-button type="primary" :icon="Plus" @click="handleAddAndUpdate('add')">新增岗位</el-button>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" align="center" width="100px">
          <template #default="{ $index }">
            {{ $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="岗位名称" align="center" />
        <el-table-column prop="code" label="岗位代码" align="center" />
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

    <editDialog ref="editDialogRef" />
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
