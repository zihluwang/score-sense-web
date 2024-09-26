<script setup lang="ts">
import { ref, reactive } from "vue";
import { genFileId, type UploadInstance, type UploadProps, type UploadUserFile } from "element-plus";
import type { ComponentSize, FormInstance, FormRules, UploadRawFile } from "element-plus";
import { IMAGE_BASE_URL } from "@/config/app";
import { Plus } from "@element-plus/icons-vue";
import { message } from "@/utils/message";
import { addNewSwiperReq, ISwiperListItem, updateSwiperReq } from "@/api/swiper";
import { uploadFileReq } from "@/api/upload";
import { nanoid } from "nanoid";

defineOptions({
  name: "EditDialog"
});

const emit = defineEmits<{
  (e: "update:tableData"): void;
}>();

interface RuleForm {
  name: string;
  status: boolean;
  fileList: UploadUserFile[];
}

const dialogVisible = ref(false);
const title = ref("");
const form = reactive({
  id: "",
  name: "",
  status: true,
  fileList: [],
  imageId: ""
});
const imageUrl = ref("");
const dialogType = ref("");

const open = (type: string, row?: ISwiperListItem) => {
  reset();
  dialogVisible.value = true;
  dialogType.value = type;
  title.value = type === "add" ? "新增轮播图" : "编辑轮播图";
  if (row) {
    form.id = row.id;
    form.name = row.name;
    form.status = !!row.status;
    form.imageId = row.imageId;
    imageUrl.value = IMAGE_BASE_URL + "/" + form.imageId;
  }
};

const reset = () => {
  form.id = "";
  form.name = "";
  form.status = true;
  form.fileList = [];
  form.imageId = "";
  imageUrl.value = "";
};

defineExpose({ open });

const checkImage = (rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error("请选择图片"));
  }
  callback();
};

const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: "请填写图片名称", trigger: "blur" }],
  status: [{ required: true, message: "请选择上下架状态", trigger: "change" }],
  fileList: [{ validator: checkImage, trigger: "change" }]
});

const upload = ref<UploadInstance>();

const handleExceed: UploadProps["onExceed"] = files => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const handleChange = (file: UploadUserFile, fileList: UploadUserFile[]) => {
  form.fileList = [];
  form.fileList.push(file);
};

const beforeUpload = (rawFile: UploadRawFile) => {
  const formData = new FormData();
  formData.append("file", form.fileList[0].raw);
  formData.append("name", nanoid());
  uploadFileReq(formData).then(res => {
    console.log(res);
    form.imageId = res.id;
    imageUrl.value = IMAGE_BASE_URL + "/" + form.imageId;
  });
  return false;
};

const ruleFormRef = ref(null);
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        if (dialogType.value === "add") {
          // 提交表单
          const reqData2 = {
            name: form.name,
            status: form.status ? 0 : 1,
            imageId: form.imageId
          };
          await addNewSwiperReq(reqData2);
          message("新增轮播图成功", { type: "success" });
        } else {
          // 提交表单
          const reqData2 = {
            id: form.id,
            name: form.name,
            status: form.status,
            imageId: form.imageId
          };
          await updateSwiperReq(reqData2);
          // 成功的话关闭
          message("更新轮播图成功", { type: "success" });
        }
        dialogVisible.value = false;
        emit("update:tableData");
      } catch (error) {
        console.log("操作轮播图失败", error);
        message("操作失败", { type: "error" });
      }
    }
  });
};
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="title" width="50%">
    <el-form ref="ruleFormRef" :model="form" label-width="auto" style="width: 100%" :rules="rules">
      <el-form-item label="图片名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入图片名称" />
      </el-form-item>
      <el-form-item label="是否上架" prop="status">
        <el-switch v-model="form.status" inline-prompt active-text="是" inactive-text="否" />
      </el-form-item>
      <el-form-item label="图片上传" prop="fileList">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-change="handleChange"
          :before-upload="beforeUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="submit(ruleFormRef)"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.avatar-uploader .avatar {
  display: block;
  width: 178px;
  height: 178px;
}
</style>

<style>
.avatar-uploader .el-upload {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  width: 178px;
  height: 178px;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
</style>
