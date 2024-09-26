import { http } from "@/utils/http";

export interface IDivisionItem {
  code: string; // 地理编码
  name: string; // 城市名称
  prefectures?: IDivisionItem[]; // 下属城市
}

/** 获取省市列表数据 */
export const getDivisionsReq = () => {
  return http.request<IDivisionItem[]>("get", "/divisions/");
};
