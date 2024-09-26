import { http } from "@/utils/http";

export interface IUploadFileResp {
  contentType: string;
  id: number;
  name: string;
  path: string;
}

/** 上传图片的接口 */
export const uploadFileReq = (formData: FormData) => {
  return http.request<IUploadFileResp>("post", "/attachments/", {
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
