import { http } from "@/utils/http";

export interface IExamPaperItem {
  id?: string;
  name?: string;
  type?: number | string;
  typeName?: string;
  description?: string;
  province?: string;
  provinceName?: string;
  prefecture?: string;
  prefectureName?: string;
  status?: number | string;
}

/**
 * 获取试卷列表
 */
export interface IExamPaperListParams {
  currentPage: number;
  pageSize: number;
  name?: string;
  divisionCode: string;
  status?: number;
}
export const getExamPaperListReq = (params: IExamPaperListParams) => {
  return http.request<IPageResult<IExamPaperItem>>("get", "/exams/", { params });
};

/**
 * 新增试卷
 */
export interface IAddExamPaperParams {
  name?: string;
  province?: string;
  prefecture?: string;
  description?: string;
  type?: number | string;
  status?: number;
}
export const addNewExamPaperReq = (data: IAddExamPaperParams) => {
  return http.request("post", "/exams/", { data });
};

/**
 * 更新试卷信息
 */
export interface IUpdateExamPaperParams {
  id: string;
  name?: undefined;
  province?: undefined;
  prefecture?: undefined;
  description?: undefined;
  type?: undefined;
  status?: number;
}
export const updateExamPaperReq = (data: IUpdateExamPaperParams) => {
  return http.request("patch", "/exams/", { data });
};

/**
 * 删除试卷
 */
export const deleteExamPaper = (id: number | string) => {
  return http.request("delete", `/exams/${id}`);
};

/**
 * 提交excel实现试卷导入
 */
export const importExamPaperReq = (data: any) => {
  return http.request("post", "/exams/import", { data });
};
