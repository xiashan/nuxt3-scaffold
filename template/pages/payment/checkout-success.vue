<!--
 * @Author: xiashan
 * @Date: 2024-09-27 17:55:39
 * @LastEditTime: 2026-04-21 11:58:32
 * @Description: 
-->
<template>
  <el-container direction="vertical">
    <el-main>
      <div class="container">
        <div class="status">
          <div v-if="loading">
            <span>{{ $t("paying") }}</span>
            <AiSpinner :dot-size="6" style="display: inline-block"></AiSpinner>
          </div>
          <div v-else-if="payResult?.status === 'paid'">
            {{ $t("paySuccess") }}
          </div>
          <div v-else>{{ $t("payFail") }}</div>
        </div>
        <AiFlex :size="24">
          <AiButton type="default" @click="onClickBack">
            {{ $t("backHome") }}
          </AiButton>
          <AiButton type="main" @click="onClickToPlan">
            {{ $t("viewDetail") }}
          </AiButton>
        </AiFlex>
      </div>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import { getOrderStatus } from "~/services/payment";

const route = useRoute();
const loading = ref(true);
const sessionId = ref("");

const payResult = ref<CheckOrderRes>();

onMounted(() => {
  sessionId.value = route.query.session_id as string;
  if (sessionId.value) {
    checkPayResult();
  }
});

const onClickBack = () => {
  window.open("/", "_self");
};
const onClickToPlan = () => {
  window.open("/pricing", "_self");
};

const checkPayResult = async () => {
  const response = await getOrderStatus(sessionId.value);
  const { status } = response.data;
  if (!response.data || status === "pending") {
    setTimeout(() => {
      checkPayResult();
    }, 6000);
  } else if (status === "paid") {
    payResult.value = { ...response.data };
    // 成功
    loading.value = false;
  } else {
    loading.value = false;
  }
};
</script>
<style lang="scss" scoped>
.el-container {
  justify-content: center;
  min-height: calc(100vh - 56px);
}

.el-main {
  flex: none;
  padding-bottom: 132px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  min-height: 400px;
  padding: 40px;
  margin: 0 auto;
  background-color: var(--bg-color);
  border-radius: 16px;
  box-shadow: 0 2px 16px 0 rgb(0 0 0 / 20%);

  .status {
    flex: 1;
    padding-top: 60px;
    font-size: 22px;
  }
}
</style>
