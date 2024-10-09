import { http } from "@/utils/http";
import type { PureHttpResponse } from "@/utils/http/types";

// interface LoginResp {
//   id: string;
//   username: string;
//   phoneNumber: string;
//   avatarId: string;
//   nonLocked: boolean;
// }

/** 预览轮播图的请求 */
export const loginReq = (data: { username: string; password: string }) => {
  return http.request<PureHttpResponse>("post", "/users/login", { data });
};
