<script setup lang="ts">
import { message } from "@/utils/message";
import { FormInstance, FormRules } from "element-plus";
import { ref, reactive } from "vue";

defineOptions({
  name: "EditDialog"
});

const emit = defineEmits<{
  (e: "update:tableData"): void;
}>();

const dialogVisible = ref(false);
const title = ref("");
const dialogType = ref("");
const form = reactive({
  name: "",
  code: ""
});

const rules = reactive<FormRules<{ name: string; code: string }>>({
  name: [{ required: true, message: "请输入岗位名称", trigger: "blur" }],
  code: [{ required: true, message: "请输入岗位代码", trigger: "blur" }]
});

const open = (type: string, id?: number) => {
  reset();
  dialogVisible.value = true;
  dialogType.value = type;
  title.value = type === "add" ? "新增岗位" : "编辑岗位";
  if (id) {
    // 获取轮播图信息
    console.log("123");
  }
};

const reset = () => {
  form.name = "";
  form.code = "";
};

defineExpose({ open });

const ruleFormRef = ref(null);
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        if (dialogType.value === "add") {
          // 提交表单
          // const reqData2 = {
          //   name: form.name,
          //   status: form.status ? 0 : 1,
          //   imageId: form.imageId
          // };
          // await addNewSwiperReq(reqData2);
          // message("新增轮播图成功", { type: "success" });
        } else {
          // // 第一件事上传图片
          // const reqData1 = new FormData();
          // reqData1.append("file", form.fileList[0].raw as Blob);
          // reqData1.append("name", form.name);
          // const res1 = await upload(reqData1);
          // console.log("上传图片", res1);
          // // 第二件事，提交表单
          // const reqData2 = {
          //   name: form.name,
          //   status: form.status,
          //   imageId: nanoid() //=> "V1StGXR8_Z5jdHi6B-myT"
          // };
          // const res2 = await addNewSwiperReq(reqData2);
          // // 成功的话关闭
          // console.log("提交表单：", form);
          // message("新增轮播图成功", { type: "success" });
        }
        dialogVisible.value = false;
        emit("update:tableData");
      } catch (error) {
        console.log("操作岗位失败", error);
        message("操作失败", { type: "error" });
      }
    }
  });
};
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="title" width="50%">
    <el-form ref="ruleFormRef" :rules="rules" :model="form" label-width="auto" style="width: 100%">
      <el-form-item label="岗位名称">
        <el-input v-model="form.name" placeholder="请输入岗位名称" />
      </el-form-item>
      <el-form-item label="岗位代码">
        <el-input v-model="form.code" placeholder="请输入岗位代码" />
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

<style lang="scss" scoped>
.container {
  width: 100%;
}
</style>
