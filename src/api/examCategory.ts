import { http } from "@/utils/http";

export interface ICategory {
  id: number;
  name: string;
}

export interface ICategoryParams {
  id?: number;
  name?: string;
}

export interface ICategoryPageParams extends ICategoryParams {
  currentPage: number;
  pageSize: number;
}

/**
 * 获取全部分类列表
 */
export const getExamCategoryAllReq = () => {
  const params: ICategoryPageParams = {
    currentPage: 1,
    pageSize: 9999
  };
  return http.request<IPageResult<ICategory>>("get", "/exams/types", { params });
};

export const getExamCategoryListReq = (params: ICategoryPageParams) => {
  return http.request<IPageResult<ICategory>>("get", "/exams/types", { params });
};

export const addNewCategoryReq = (data: ICategoryParams) => {
  return http.request("post", "/exams/types", { data });
};

export const updateCategoryReq = (data: ICategoryParams) => {
  return http.request("patch", "/exams/types", { data });
};

export const deleteCategoryReq = (id: number) => {
  return http.request("delete", `/exams/types/${id}`);
};
