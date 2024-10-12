import { http } from "@/utils/http";

/**
 * 获取考试题目列表
 * @param examId
 */
export const getExamQuestionListReq = (examId: string) => {
  return http.request("get", "/exams/" + examId);
};
