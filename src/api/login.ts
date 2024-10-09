import { http } from "@/utils/http";

interface LoginResp {
  id: string;
  username: string;
  phoneNumber: string;
  avatarId: string;
  nonLocked: boolean;
}

/** 预览轮播图的请求 */
export const loginReq = (data: { username: string; password: string }) => {
  return http.request<LoginResp>("post", "/users/login", { data });
};
