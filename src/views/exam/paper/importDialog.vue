<script setup lang="ts">
import { reactive, ref } from "vue";
import { FormInstance, FormRules } from "element-plus";
import { updateCategoryReq } from "@/api/examCategory";
import { message } from "@/utils/message";
import { Download, Upload } from "@element-plus/icons-vue";
import { genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";

defineOptions({
  name: "importDialog"
});

const emit = defineEmits<{
  (e: "update:tableData"): void;
}>();

const dialogVisible = ref(false);
const title = ref("导入试卷");

const form = reactive({
  id: 0,
  name: "",
  area: ["11", "1101"],
  status: 0
});

const rules = reactive<FormRules<{ name: string }>>({
  name: [{ required: true, message: "请输入分类名称", trigger: "blur" }]
});

const open = () => {
  reset();
  dialogVisible.value = true;
};

const reset = () => {
  form.id = 0;
  form.name = "";
  form.area = ["11", "1101"];
  form.status = 0;
};

defineExpose({ open });

const formRef = ref(null);
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const reqData = {
          id: form.id,
          name: form.name
        };
        await updateCategoryReq(reqData);
        message("编辑成功", { type: "success" });
        dialogVisible.value = false;
        emit("update:tableData");
      } catch (error) {
        console.log("操作失败失败", error);
        message("操作失败失败", { type: "error" });
      }
    }
  });
};

const templateOneRef = ref(null);

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
    <el-button :icon="Download" type="primary" plain style="margin-bottom: 10px" @click="templateOneRef.click()">
      模板下载
    </el-button>
    <a
      ref="templateOneRef"
      style="width: 0; height: 0"
      href="/templateFile/客观题答题模版.xlsx"
      download="客观题答题模版.xlsx"
    />

    <div style="margin-bottom: 10px">2. 点击下方按钮选择需要导入的文件</div>

    <el-upload ref="upload" class="upload-demo" action="" :limit="1" :on-exceed="handleExceed" :auto-upload="false">
      <template #trigger>
        <el-button :icon="Upload" type="primary" plain>选择文件</el-button>
      </template>
      <template #tip>
        <div class="el-upload__tip" style="color: red">仅支持一个文件，选择新的文件会将旧的文件覆盖掉</div>
      </template>
    </el-upload>

    <div style="margin-bottom: 10px">3. 点击右下角确认按钮开始试卷导入工作</div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="submit(formRef)"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.dialog-footer-6667777 {
  width: 100%;
}
</style>
