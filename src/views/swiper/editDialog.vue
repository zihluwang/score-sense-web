<script setup lang="ts">
import { ref, reactive } from "vue";
import { UploadRequestOptions, type UploadUserFile } from "element-plus";
import type { FormInstance, FormRules, UploadRawFile } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { message } from "@/utils/message";
import { addNewSwiperReq, ISwiperListItem, updateSwiperReq } from "@/api/swiper";
import { uploadFileReq } from "@/api/upload";
import { nanoid } from "nanoid";
import { getAttachmentUrl } from "@/utils/attachments";

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
    imageUrl.value = getAttachmentUrl(row.imageId);
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

const onBefore = (file: UploadRawFile) => {
  const isExceed = file.size / 1024 / 1024 > 5;
  if (isExceed) {
    message("文件大小不能超过5MB");
    return false;
  }
  // 清空之前的文件，确保只有一个文件
  form.fileList = [file];
  return true;
};

const customUpload = (options: UploadRequestOptions) => {
  const { file, onSuccess, onError } = options;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", nanoid());

  return uploadFileReq(formData)
    .then(res => {
      console.log(res);
      form.imageId = res.id;
      imageUrl.value = getAttachmentUrl(form.imageId);
      message("上传成功", { type: "success" });
    })
    .catch(e => {
      message("上传失败", { type: "error" });
    });
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
            status: form.status ? 1 : 0,
            imageId: form.imageId
          };
          await addNewSwiperReq(reqData2);
          message("新增轮播图成功", { type: "success" });
        } else {
          // 提交表单
          const reqData2 = {
            id: form.id,
            name: form.name,
            status: form.status ? 1 : 0,
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
          v-model:file-list="form.fileList"
          :show-file-list="false"
          class="avatar-uploader"
          :limit="1"
          :before-upload="onBefore"
          :http-request="customUpload"
          action=""
          list-type="picture"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false"> 取消</el-button>
        <el-button type="primary" @click="submit(ruleFormRef)"> 确认</el-button>
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
