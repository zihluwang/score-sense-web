import { http } from "@/utils/http";

export interface IJobListItem {
  id: string;
  name: string;
  province: string;
  provinceName?: string;
  prefecture: string;
  prefectureName?: string;
  examIds?: string[];
}

/**
 * 获取岗位列表
 */
export interface IJobListReqParams {
  currentPage: number;
  pageSize: number;
  examId?: string;
  name?: string;
  divisionCode?: string;
}
export const getJobListReq = (params: IJobListReqParams) => {
  return http.request<IPageResult<IJobListItem>>("get", "/vacancies/", { params });
};

/**
 * 新增岗位
 */
export interface IAddJobReqParams {
  name: string;
  province: string;
  prefecture: string;
}

export const addNewJobReq = (data: IAddJobReqParams) => {
  return http.request("post", "/vacancies/", { data });
};

/**
 * 更新岗位
 */
export interface IUpdateJobReqParams {
  id: string;
  name?: string;
  province?: string;
  prefecture?: string;
  examIds?: string[];
}

export const updateJobReq = (data: IUpdateJobReqParams) => {
  return http.request("patch", "/vacancies/", { data });
};

/**
 * 删除岗位
 */
export const deleteJobReq = (id: number | string) => {
  return http.request("delete", `/vacancies/${id}`);
};

/**
 * 导入岗位
 */
export const importNewJobReq = (data: any) => {
  return http.request("post", "/vacancies/import", { data });
};
