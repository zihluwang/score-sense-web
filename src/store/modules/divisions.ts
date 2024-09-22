import { getDivisionsReq } from "@/api/divisions";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDivisionStore = defineStore("divisions", () => {
  const divisions = ref([]);

  const getDivisions = async () => {
    try {
      const res = await getDivisionsReq();
      console.log("🚀 ~ getDivisions ~ res:", res);
      setDivisions(res);
    } catch (error) {
      console.error("获取省市数据失败", error);
    }
  };

  const setDivisions = async (data: any) => {
    divisions.value = data;
  };

  const resetDivisions = async () => {
    divisions.value = [];
  };

  return {
    divisions,
    getDivisions,
    setDivisions,
    resetDivisions
  };
});
