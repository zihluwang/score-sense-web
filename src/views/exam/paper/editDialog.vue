<script setup lang="ts">
import { message } from "@/utils/message";
import { FormInstance } from "element-plus";
import { ref, reactive } from "vue";
import useAllExamTypes from "@/hooks/useAllExamTypes";
import useDivisions from "@/hooks/useDivisions";
import {
  addNewExamPaperReq,
  IAddExamPaperParams,
  IExamPaperItem,
  IUpdateExamPaperParams,
  updateExamPaperReq
} from "@/api/examPaper";

const { getDivisionList, divisionOptions } = useDivisions();
const { examTypes, getAllExamTypes } = useAllExamTypes();

defineOptions({
  name: "EditDialog"
});

const emit = defineEmits<{
  (e: "update:tableData"): void;
}>();

const formRef = ref(null);
const dialogVisible = ref(false);
const title = ref("");
const dialogType = ref("");
const form = ref({
  id: undefined,
  name: undefined,
  area: undefined,
  status: true,
  type: undefined,
  typeName: undefined,
  description: undefined,
  province: undefined,
  provinceName: undefined,
  prefecture: undefined,
  prefectureName: undefined
});

const rules = reactive({
  name: [{ required: true, message: "请输入考试名称", trigger: "blur" }],
  area: [{ required: true, message: "请选择考试所属省市", trigger: "change" }],
  type: [{ required: true, message: "请选择考试名称", trigger: "change" }],
  status: [{ required: true, message: "请配置考试上下架状态", trigger: "change" }]
});

const open = (type: string, row?: IExamPaperItem) => {
  reset();
  // 展示弹窗
  dialogVisible.value = true;
  dialogType.value = type;
  title.value = type === "add" ? "新增试卷" : "编辑试卷";
  // 初始化省市区
  getDivisionList();
  // 初始化考试分类
  getAllExamTypes();
  // 如果存在试卷数据就回显
  if (row) {
    form.value.id = row.id;
    form.value.name = row.name;
    form.value.area = [row.province, row.prefecture];
    form.value.status = !!row.status;
    form.value.type = row.type.toString();
    form.value.typeName = row.typeName;
    form.value.description = row.description;
    form.value.province = row.province;
    form.value.provinceName = row.provinceName;
    form.value.prefecture = row.prefecture;
    form.value.prefectureName = row.prefectureName;
  }
  console.log("=>(editDialog.vue:66) form", form.value);
};

const reset = () => {
  form.value.id = undefined;
  form.value.name = undefined;
  form.value.area = undefined;
  form.value.status = true;
  form.value.type = undefined;
  form.value.typeName = undefined;
  form.value.description = undefined;
  form.value.province = undefined;
  form.value.provinceName = undefined;
  form.value.prefecture = undefined;
  form.value.prefectureName = undefined;
  formRef?.value?.resetFields();
};

defineExpose({ open });

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        if (dialogType.value === "add") {
          const reqData: IAddExamPaperParams = {
            name: form.value.name,
            province: form.value.area[0],
            prefecture: form.value.area[1],
            description: form.value.description,
            type: form.value.type,
            status: form.value.status ? 1 : 0
          };
          await addNewExamPaperReq(reqData);
          message("新增成功", { type: "success" });
        } else {
          const reqData: IUpdateExamPaperParams = {
            id: form.value.id,
            name: form.value.name,
            province: form.value.area[0],
            prefecture: form.value.area[1],
            description: form.value.description,
            type: form.value.type,
            status: form.value.status ? 1 : 0
          };
          await updateExamPaperReq(reqData);
          message("编辑成功", { type: "success" });
        }
        dialogVisible.value = false;
        emit("update:tableData");
      } catch (error) {
        console.log("操作失败失败", error);
        message("操作失败失败", { type: "error" });
      }
    }
  });
};
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="title" width="50%">
    <el-form ref="formRef" :rules="rules" :model="form" label-width="auto" style="width: 100%">
      <el-form-item label="试卷名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入试卷名称" />
      </el-form-item>
      <el-form-item label="所属省市" prop="area">
        <el-cascader v-model="form.area" :options="divisionOptions" clearable placeholder="请选择省市" />
      </el-form-item>
      <el-form-item label="试卷分类" prop="type">
        <el-select v-model="form.type" placeholder="请选择试卷分类" style="width: 240px">
          <el-option v-for="item in examTypes" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否上架" prop="status">
        <el-switch v-model="form.status" inline-prompt active-text="是" inactive-text="否" />
      </el-form-item>
      <el-form-item label="考试备注">
        <el-input v-model="form.description" :rows="3" type="textarea" placeholder="请输入考试备注信息" />
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
.container {
  width: 100%;
}
</style>
