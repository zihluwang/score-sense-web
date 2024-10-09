import { http } from "@/utils/http";

/**
 * 获取试卷列表
 */
export const getExamPaperListReq = (data: any) => {
  return http.request("get", "/exams/", { data });
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
export const updateExamPaperReq = (id: string) => {
  return http.request("patch", `/exams/${id}`);
};

/**
 * 删除试卷
 */
export const deleteExamPaper = (data: any) => {
  return http.request("delete", "/exams/types", { data });
};

/**
 * 提交excel实现试卷导入
 */
export const importExamPaperReq = (data: any) => {
  return http.request("post", "/exams/import", { data });
};
