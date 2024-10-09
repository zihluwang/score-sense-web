import { getDivisionsReq } from "@/api/divisions";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useDivisionStore = defineStore("divisions", () => {
  const divisions = ref([]);

  const getDivisions = async () => {
    try {
      const res = await getDivisionsReq();
      console.log("获取省市数据成功", res);
      await setDivisions(res);
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

  const divisionOptions = computed(() => {
    return divisions.value.map(province => ({
      value: province.code,
      label: province.name,
      children: province.prefectures.map(prefecture => ({
        value: prefecture.code,
        label: prefecture.name
      }))
    }));
  });

  return {
    divisions,
    getDivisions,
    setDivisions,
    resetDivisions,
    divisionOptions
  };
});
