<script setup lang="ts">
import { reactive, ref } from "vue";
import { genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";
import { message } from "@/utils/message";
import { Download, Upload } from "@element-plus/icons-vue";
import { importNewJobReq } from "@/api/jobPosition";

defineOptions({
  name: "importDialog"
});

const emit = defineEmits<{
  (e: "update:tableData"): void;
}>();

const dialogVisible = ref(false);
const title = ref("导入试卷");

const form = reactive({
  fileList: []
});

const open = () => {
  reset();
  dialogVisible.value = true;
};

const reset = () => {
  form.fileList = [];
};

defineExpose({ open });

const submit = async () => {
  // 判断下 el-upload 是否选择了文件
  if (form.fileList.length === 0) {
    message("请选择文件", { type: "error" });
    return;
  }
  // 如果选择了就可以发请求了
  const formData = new FormData();
  formData.append("attachment", form.fileList[0].raw);

  try {
    await importNewJobReq(formData);
    message("导入岗位成功", { type: "success" });
    emit("update:tableData");
  } catch (e) {
    console.error("导入岗位失败", e);
    message("导入岗位失败", { type: "error" });
  }
};

const templateTwoRef = ref(null);

const upload = ref<UploadInstance>();

const handleExceed: UploadProps["onExceed"] = files => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="title" width="50%">
    <div style="margin-bottom: 10px">1. 点击下方按钮下载模板文件进行填写</div>
    <el-button :icon="Download" type="primary" plain style="margin-bottom: 10px" @click="templateTwoRef.click()">
      模板下载
    </el-button>
    <a
      ref="templateTwoRef"
      style="width: 0; height: 0"
      href="/templateFile/岗位上传模版.xlsx"
      download="岗位上传模版.xlsx"
    />

    <div style="margin-bottom: 10px">2. 点击下方按钮选择需要导入的文件</div>

    <el-upload
      ref="upload"
      v-model:file-list="form.fileList"
      class="upload-demo"
      action=""
      :limit="1"
      :on-exceed="handleExceed"
      :auto-upload="false"
    >
      <template #trigger>
        <el-button :icon="Upload" type="primary" plain>选择文件</el-button>
      </template>
      <template #tip>
        <div class="el-upload__tip" style="color: red">仅支持一个文件，选择新的文件会将旧的文件覆盖掉</div>
      </template>
    </el-upload>

    <div style="margin-bottom: 10px">3. 点击右下角确认按钮开始岗位导入工作</div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="submit()"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.dialog-footer-6667777 {
  width: 100%;
}
</style>
