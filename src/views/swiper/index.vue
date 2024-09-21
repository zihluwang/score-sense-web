<script setup lang="ts">
import { reactive } from "vue";
import { Search, Refresh, Plus, View } from "@element-plus/icons-vue";

defineOptions({
  name: "SwiperIndex"
});

const tableData = [
  {
    name: "1.png",
    link: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
    status: 1,
    createTime: "2024-09-22 00:00:00",
    updateTime: "2024-09-23 00:00:00"
  },
  {
    name: "2.png",
    link: "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
    status: 2,
    createTime: "2024-09-22 00:00:00",
    updateTime: "2024-09-23 00:00:00"
  },
  {
    name: "3.png",
    link: "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
    status: 2,
    createTime: "2024-09-22 00:00:00",
    updateTime: "2024-09-23 00:00:00"
  },
  {
    name: "4.png",
    link: "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
    status: 2,
    createTime: "2024-09-22 00:00:00",
    updateTime: "2024-09-23 00:00:00"
  },
  {
    name: "5.png",
    link: "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
    status: 1,
    createTime: "2024-09-22 00:00:00",
    updateTime: "2024-09-23 00:00:00"
  },
  {
    name: "6.png",
    link: "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
    status: 1,
    createTime: "2024-09-22 00:00:00",
    updateTime: "2024-09-23 00:00:00"
  },
  {
    name: "7.png",
    link: "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
    status: 1,
    createTime: "2024-09-22 00:00:00",
    updateTime: "2024-09-23 00:00:00"
  }
];

const formInline = reactive({
  user: "",
  region: "",
  date: ""
});

const onSubmit = () => {
  console.log("submit!");
};
</script>

<template>
  <div>
    <el-card class="mb-[24px]" shadow="never">
      <el-form class="mb-[-18px] form-inline" :inline="true" :model="formInline">
        <el-form-item label="图片名称">
          <el-input v-model="formInline.user" placeholder="请输入图片名称" clearable />
        </el-form-item>
        <el-form-item label="上下架状态">
          <el-select v-model="formInline.region" placeholder="请选择状态" clearable>
            <el-option label="全部" :value="0" />
            <el-option label="上架" :value="1" />
            <el-option label="下架" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="上架时间">
          <el-date-picker v-model="formInline.date" type="date" placeholder="Pick a date" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="onSubmit">搜索</el-button>
          <el-button :icon="Refresh" @click="onSubmit">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <div class="mb-[12px]">
        <el-button type="primary" :icon="Plus">新增轮播图</el-button>
        <el-button :icon="View">效果预览</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" align="center" width="100px">
          <template #default="{ $index }">
            {{ $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="图片名称" align="center" />
        <el-table-column prop="link" label="图片链接" align="center" />
        <el-table-column label="图片" align="center">
          <template #default="{ row }">
            <el-image style="width: 100px; height: 100px" :src="row.link" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="status" label="上下架状态" align="center">
          <template #default="{ row }">
            <el-tag v-show="row.status === 1" type="success">已上架</el-tag>
            <el-tag v-show="row.status === 2" type="info">已下架</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="上传时间" align="center" />
        <el-table-column prop="updateTime" label="最近更新时间" align="center" />
        <el-table-column fixed="right" label="操作" align="center" width="180px">
          <template #default="{ row }">
            <el-button link type="primary" :data-name="row.name">编辑</el-button>
            <el-button link type="danger" :data-name="row.name">删除</el-button>
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
