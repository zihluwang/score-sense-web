<script setup lang="ts">
import { message } from "@/utils/message";
import { FormInstance } from "element-plus";
import { ref, reactive } from "vue";
import { addNewJobReq, IAddJobReqParams, IJobListItem, IUpdateJobReqParams, updateJobReq } from "@/api/jobPosition";
import useDivisions from "@/hooks/useDivisions";

defineOptions({
  name: "EditDialog"
});

const emit = defineEmits<{
  (e: "update:tableData"): void;
}>();

const { getDivisionList, getProvinceName, getPrefectureName, divisionOptions } = useDivisions();

const dialogVisible = ref(false);
const title = ref("");
const dialogType = ref("");
const form = reactive({
  id: undefined,
  area: undefined,
  name: undefined
});

const rules = reactive({});

const open = (type: string, row?: IJobListItem) => {
  reset();
  dialogVisible.value = true;
  dialogType.value = type;
  title.value = type === "add" ? "新增岗位" : "编辑岗位";
  // 初始化省市区
  getDivisionList();
  // 如果存在行数据就进行数据回显
  if (row) {
    form.id = row.id;
    form.name = row.name;
    form.area = [row.province, row.prefecture];
  }
};

const reset = () => {
  form.id = undefined;
  form.area = undefined;
  form.name = undefined;
  ruleFormRef?.value?.resetFields();
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
          const reqData: IAddJobReqParams = {
            name: form.name,
            province: form.area[0],
            prefecture: form.area[1]
          };
          await addNewJobReq(reqData);
          message("新增岗位成功", { type: "success" });
        } else {
          // 提交表单
          const reqData: IUpdateJobReqParams = {
            id: form.id,
            name: form.name,
            province: form.area[0],
            prefecture: form.area[1]
          };
          await updateJobReq(reqData);
          message("更新岗位成功", { type: "success" });
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
      <el-form-item label="省市选择">
        <el-cascader v-model="form.area" :options="divisionOptions" clearable placeholder="请选择省市" />
      </el-form-item>
      <el-form-item label="岗位名称">
        <el-input v-model="form.name" placeholder="请输入岗位名称" />
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
