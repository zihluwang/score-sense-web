import { http } from "@/utils/http";

export interface ISwiperListParams {
  name?: string;
  status?: string;
  currentPage: number;
  pageSize: number;
}

export interface ISwiperListItem {
  id: number;
  imageId: number;
  name: string;
  status: string;
}

/** 预览轮播图的请求 */
export const getReviewSwiperReq = () => {
  return http.request<ISwiperListItem[]>("get", "/swipes/enabled");
};

/** 分页获取轮播图列表 */
export const getSwiperListReq = (params: ISwiperListParams) => {
  return http.request<{
    pageNumber: number;
    pageSize: number;
    records: ISwiperListItem[];
    totalPage: number;
    totalRow: number;
  }>("get", "/swipes/", { params });
};

/** 新增轮播图 */
export const addNewSwiperReq = data => {
  return http.request("post", "/swipes/", { data });
};

/** 更新轮播图 */
export const updateSwiperReq = data => {
  return http.request("patch", "/swipes/", { data });
};

/** 删除轮播图 */
export const deleteSwiperReq = (id: number) => {
  return http.request("delete", "/swipes/" + id);
};
