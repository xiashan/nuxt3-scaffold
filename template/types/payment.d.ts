/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-05-22 15:05:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2026-04-21 15:23:24
 * @Description:
 */
interface CheckOrderRes {
  checkout_status: string;
  customer_id: string;
  payment_status: string;
  session_id: string; // "cs_test_a1nueKw3ZUSYdcRXWU4MKOmtdSixB4L3VVyUwypVUdQLtFAVngNmkDD5P0";
  status: string; // "pending" | "paid";
  subscription_id: string;
}
