import { http } from "@/utils/http";

export interface ICategory {
  id: number;
  name: string;
}

export interface ICategoryParams {
  id?: number;
  name: string;
}

export interface ICategoryPageParams extends ICategoryParams {
  currentPage: number;
  pageSize: number;
}

export const getExamCategoryListReq = (params: ICategoryPageParams) => {
  return http.request<{
    pageNumber: number;
    pageSize: number;
    records: ICategory[];
    totalPage: number;
    totalRow: number;
  }>("get", "/exams/types", { params });
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
