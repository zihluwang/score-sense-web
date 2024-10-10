import { computed, ref } from "vue";
import { message } from "@/utils/message";
import { getDivisionsReq } from "@/api/divisions";

export default function useDivisions() {
  const divisionList = ref([]);
  const divisionFlatList = ref([]);
  const provinceList = ref([]);
  const prefectureList = ref([]);

  const getDivisionList = async () => {
    try {
      const res = await getDivisionsReq();
      console.log("获取省市数据成功", res);
      divisionList.value = res;
      console.log("=>(useDivisions.ts:16) divisionList.value", divisionList.value);

      provinceList.value = res.map(province => ({ code: province.code, name: province.name }));
      console.log("=>(useDivisions.ts:18) provinceList.value", provinceList.value);

      prefectureList.value = res.flatMap(province => province.prefectures);
      console.log("=>(useDivisions.ts:20) prefectureList.value", prefectureList.value);

      divisionFlatList.value = [...provinceList.value, ...prefectureList.value];
      console.log("=>(useDivisions.ts:25) divisionFlatList.value", divisionFlatList.value);
    } catch (error) {
      console.error("获取省市数据失败", error);
      message("获取省市数据失败", { type: "error" });
    }
  };

  const divisionOptions = computed(() => {
    return divisionList.value.map(province => ({
      value: province.code,
      label: province.name,
      children: province.prefectures.map(prefecture => ({
        value: prefecture.code,
        label: prefecture.name
      }))
    }));
  });

  const getProvinceName = (provinceId: string | number): string => {
    return provinceList.value.find(province => province.code == provinceId)?.name || "";
  };

  const getPrefectureName = (prefectureId: string | number): string => {
    return prefectureList.value.find(prefecture => prefecture.code == prefectureId)?.name || "";
  };

  return {
    divisionList,
    divisionFlatList,
    provinceList,
    prefectureList,
    getDivisionList,
    divisionOptions,
    getProvinceName,
    getPrefectureName
  };
}
