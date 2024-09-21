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
  link: ""
});

const open = (type: string, id?: number) => {
  reset();
  dialogVisible.value = true;
  title.value = type === "add" ? "新增轮播图" : "编辑轮播图";
  if (id) {
    // 获取轮播图信息
    console.log("123");
  }
};

const reset = () => {
  form.name = "";
  form.status = "";
  form.link = "";
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="dialogVisible" title="预览轮播图" width="500px">
    <el-form :model="form" label-width="auto" style="width: 100%">
      <el-form-item label="图片名称">
        <el-input v-model="form.name" placeholder="请输入图片名称" />
      </el-form-item>
      <el-form-item label="是否上架">
        <el-switch v-model="form.status" inline-prompt active-text="是" inactive-text="否" />
      </el-form-item>
      <!-- <el-form-item label="图片上传">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item> -->
    </el-form>
    <template #footer>
      <div class="dialog-footer">
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
