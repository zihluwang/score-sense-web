import { ref } from "vue";
import { getExamCategoryAllReq } from "@/api/examCategory";
import { message } from "@/utils/message";

export default function useAllExamTypes() {
  const examTypes = ref([]);

  const getAllExamTypes = async () => {
    // 使用 async await 调用 getExamCategoryListReq 方法，不需要传递任何东西直接获取后端返回响应
    // 成功就在控制台输出数据
    // 错误就在控制台打印错误并且提示用户
    try {
      const res = await getExamCategoryAllReq();
      console.log("获取全部考试分类成功", res.records);
      examTypes.value = res.records;
    } catch (error) {
      console.error("获取全部考试分类失败", error);
      message("获取全部考试分类失败", { type: "error" });
    }
  };

  const getExamTypeName = (typeId: string | number): string => {
    const examType = examTypes.value.find(item => item.id == typeId);
    return examType ? examType.name : "";
  };

  return {
    examTypes,
    getAllExamTypes,
    getExamTypeName
  };
}
