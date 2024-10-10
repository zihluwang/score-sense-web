<script setup lang="ts">
import { addNewCategoryReq, updateCategoryReq } from "@/api/examCategory";
import { message } from "@/utils/message";
import { FormInstance, FormRules } from "element-plus";
import { ref, reactive } from "vue";
import { useDivisionStore } from "@/store/modules/divisions";

defineOptions({
  name: "EditDialog"
});

const emit = defineEmits<{
  (e: "update:tableData"): void;
}>();

const divisionStore = useDivisionStore();

const dialogVisible = ref(false);
const title = ref("");
const dialogType = ref("");
const form = reactive({
  id: 0,
  name: "",
  area: ["11", "1101"],
  status: 0
});

const rules = reactive<FormRules<{ name: string }>>({
  name: [{ required: true, message: "请输入分类名称", trigger: "blur" }]
});

const open = (type: string, row?: any) => {
  reset();
  dialogVisible.value = true;
  dialogType.value = type;
  title.value = type === "add" ? "新增试卷" : "编辑试卷";
  if (row) {
    form.id = row.id;
    form.name = row.name;
    form.area = row.area;
    form.status = row.status;
  }
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
        if (dialogType.value === "add") {
          const reqData = {
            name: form.name
          };
          await addNewCategoryReq(reqData);
          message("新增成功", { type: "success" });
        } else {
          const reqData = {
            id: form.id,
            name: form.name
          };
          await updateCategoryReq(reqData);
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
      <el-form-item label="所属分类" prop="name">
        <el-input v-model="form.name" placeholder="请选择试卷所属分类" />
      </el-form-item>
      <el-form-item label="试卷名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入试卷名称" />
      </el-form-item>
      <el-form-item label="所属省市" prop="name">
        <el-cascader v-model="form.area" :options="divisionStore.divisionOptions" clearable placeholder="请选择省市" />
      </el-form-item>
      <el-form-item label="是否上架" prop="name">
        <el-switch v-model="form.status" inline-prompt active-text="是" inactive-text="否" />
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
