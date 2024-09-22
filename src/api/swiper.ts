import { http } from "@/utils/http";
import { getBaseUrl } from "./utils";

export interface ISwiperListItem {
  id: number;
  name: string;
  sequence: number;
  imageUrl: string;
}

/** 预览轮播图的请求 */
export const getReviewSwiperReq = () => {
  return http.request<ISwiperListItem[]>("get", getBaseUrl("/swipes/enabled"));
};
