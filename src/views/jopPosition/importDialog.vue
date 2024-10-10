<script setup lang="ts">
import { reactive, ref } from "vue";
import { FormInstance, FormRules } from "element-plus";
import { addNewCategoryReq, updateCategoryReq } from "@/api/examCategory";
import { message } from "@/utils/message";
import { Download, UploadFilled } from "@element-plus/icons-vue";

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

const templateTwoRef = ref(null);
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

    <div style="margin-bottom: 10px">2. 点击下方区域选择编辑完成的模板文件或者将上述文件拖拽至此区域</div>

    <div style="margin-bottom: 10px">3. 点击右下角确认按钮开始试卷导入工作</div>

    <el-form ref="formRef" :rules="rules" :model="form" label-width="auto" style="width: 100%">
      <el-form-item label="">
        <el-upload :show-file-list="false" drag action="" :limit="1" style="width: 100%">
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">拖拽文件至此或者<em>点击上传文件</em></div>
        </el-upload>
      </el-form-item>
    </el-form>

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
