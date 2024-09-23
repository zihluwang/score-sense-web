<script setup lang="ts">
import { ref, reactive } from "vue";

defineOptions({
  name: "EditDialog"
});

const dialogVisible = ref(false);
const title = ref("");
const form = reactive({
  name: "",
  status: "",
  weight: 0
});

const open = (type: string, id?: number) => {
  reset();
  dialogVisible.value = true;
  title.value = type === "add" ? "新增标签" : "编辑标签";
  if (id) {
    // 获取轮播图信息
    console.log("123");
  }
};

const reset = () => {
  form.name = "";
  form.status = "";
  form.weight = 0;
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="title" width="50%">
    <el-form :model="form" label-width="auto" style="width: 100%">
      <el-form-item label="分类名称">
        <el-input v-model="form.name" placeholder="请输入标签名称" />
      </el-form-item>
      <el-form-item label="是否上架">
        <el-switch v-model="form.status" inline-prompt active-text="是" inactive-text="否" />
      </el-form-item>
      <el-form-item label="权重">
        <el-input-number v-model="form.weight" :min="0" :max="100" placeholder="请输入权重" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="dialogVisible = false"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
}
</style>
