/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-05-22 14:35:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2026-04-21 15:23:20
 * @Description:
 */
import type { ResponseData } from "@/types/api";

export const getOrderStatus = (sessionId: string) => {
  return $api<ResponseData<CheckOrderRes>>(
    `/fire/user-points/subscription/checkout-session/status?session_id=${sessionId}`,
    {
      method: "get",
    },
  );
};
