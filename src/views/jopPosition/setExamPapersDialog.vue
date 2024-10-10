<script setup lang="ts">
import { ref } from "vue";
import { message } from "@/utils/message";
import { getExamPaperListReq, IExamPaperListParams } from "@/api/examPaper";
import { IJobListItem, IUpdateJobReqParams, updateJobReq } from "@/api/jobPosition";

defineOptions({
  name: "SetExamPapersDialog"
});

const emit = defineEmits<{
  (e: "update:tableData"): void;
}>();

interface Option {
  key: string;
  label: string;
}

const dialogVisible = ref(false);
const title = ref("配置试卷");

const id = ref("");
const data = ref<Option[]>([]);
const value = ref([]);

const open = (row: IJobListItem) => {
  reset();
  dialogVisible.value = true;
  id.value = row.id;
  generateData(row.prefecture);
};

const reset = () => {
  value.value = [];
  data.value = [];
};

defineExpose({ open });

const filterMethod = (query, item) => {
  console.log("=>(setExamPapersDialog.vue:37) item", item);
  console.log("=>(setExamPapersDialog.vue:37) query", query);
  return item.label.toLowerCase().includes(query.toLowerCase());
};

const generateData = async (divisionCode: string, examId: string[] = []) => {
  try {
    // 发请求获取全部试卷
    const reqData: IExamPaperListParams = {
      currentPage: 1,
      pageSize: 9999,
      divisionCode
    };
    const res = await getExamPaperListReq(reqData);
    console.log("获取试卷信息成功", res);
    // 根据传递进来的examId数组拆分为两组
    const allPapers = res.records;
    allPapers.forEach(item => {
      // 已配置组最终进入 value
      if (examId.includes(item.id)) {
        value.value.push(item.id);
      } else {
        // 未配置组最终进入 data
        data.value.push({
          label: item.name,
          key: item.id
        });
      }
    });
  } catch (e) {
    console.error("获取试卷信息失败", e);
    message("获取试卷信息失败", { type: "error" });
  }
};

const submit = async () => {
  try {
    // 提交表单
    const reqData: IUpdateJobReqParams = {
      id: id.value,
      examId: value.value
    };
    await updateJobReq(reqData);
    message("配置试卷成功", { type: "success" });
    dialogVisible.value = false;
    emit("update:tableData");
  } catch (error) {
    console.log("配置试卷失败", error);
    message("配置失败", { type: "error" });
  }
};
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="title" width="1000px">
    <el-transfer
      v-model="value"
      :data="data"
      class="transfer-diy"
      filterable
      :filter-method="filterMethod"
      filter-placeholder="搜索试卷"
      :titles="['可配置试卷', '已配置试卷']"
      :button-texts="['取消', '添加']"
    />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="submit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.transfer-diy {
  --el-transfer-panel-width: 300px;

  text-align: center;
}

.dialog-footer-6667777 {
  width: 100%;
}
</style>
