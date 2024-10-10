import { http } from "@/utils/http";

export interface IExamPaperItem {
  id?: string;
  name?: string;
  type?: number;
  typeName?: string;
  description?: string;
  province?: string;
  prefecture?: string;
  status?: number;
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
export const addNewExamPaperReq = (data: any) => {
  return http.request("post", "/exams/", { data });
};

/**
 * 更新试卷信息
 */
export const updateExamPaperReq = (data: any) => {
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
