<template>
  <el-scrollbar
    ref="scrollbarRef"
    class="infinite-scrollbar"
    v-bind="attrs"
    :noresize="noresize"
    :distance="distance"
    @end-reached="handleEndReached"
    @scroll="handleScroll"
  >
    <slot
      :items="items"
      :loading="loading"
      :finished="finished"
      :reload="reload"
      :load-more="loadMore"
      :set-items="setItems"
      :mutate="mutateItems"
    />
    <template v-if="$slots.loading && loading">
      <slot name="loading" :loading="loading" :items="items" />
    </template>
    <template v-if="$slots.finished && finished">
      <slot name="finished" :finished="finished" />
    </template>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { nextTick } from "vue";
import type { ScrollbarInstance, ScrollbarDirection } from "element-plus";
import type { FetcherParams } from "@/types/api";

type FetcherResult<T = any> = T[];

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const props = withDefaults(
  defineProps<{
    fetcher: (params: FetcherParams) => Promise<FetcherResult>;
    pageSize?: number;
    autoLoad?: boolean;
    distance?: number;
    noresize?: boolean;
    trigger?: ScrollbarDirection;
    initialItems?: any[];
    autoLoadMore?: boolean;
  }>(),
  {
    pageSize: 20,
    autoLoad: true,
    distance: 20,
    noresize: false, // 不响应容器尺寸变化，如果容器尺寸不会发生变化，最好设置它可以优化性能
    trigger: "bottom",
    initialItems: () => [],
    autoLoadMore: true,
  },
);

const emit = defineEmits<{
  (event: "load", payload: { items: any[]; reset: boolean }): void;
  (event: "error", error: unknown): void;
  (event: "scroll", payload: { scrollTop: number; scrollLeft: number }): void;
}>();

const scrollbarRef = useTemplateRef<ScrollbarInstance>("scrollbarRef");
const items = ref<any[]>([...props.initialItems]);
const loading = ref(true);
const finished = ref(false);
const page = ref(1);
const fetchToken = ref<symbol | null>(null);

const setItems = (next: any[]) => {
  items.value = Array.isArray(next) ? next : [];
};

const maybeTriggerLoadMore = () => {
  if (finished.value || loading.value || !props.autoLoadMore) return;
  const wrap = scrollbarRef.value?.wrapRef;
  if (!wrap) return;
  const threshold =
    typeof props.distance === "number" && props.distance > 0
      ? props.distance
      : 20;
  const { scrollTop, clientHeight, scrollHeight } = wrap;
  const nearBottom = scrollTop + clientHeight >= scrollHeight - threshold;
  const insufficientContent = scrollHeight <= clientHeight + threshold;
  if (nearBottom || insufficientContent) {
    loadMore().catch(() => {});
  }
};

const mutateItems = (updater: (list: any[]) => any[]) => {
  const draft = Array.isArray(items.value) ? [...items.value] : [];
  const next = updater(draft);
  setItems(next);
  setTimeout(() => {
    maybeTriggerLoadMore();
  }, 500);
};

const resetState = () => {
  page.value = 1;
  finished.value = false;
};

const fetchData = async (reset = false) => {
  if (typeof props.fetcher !== "function") return;
  if (loading.value && !reset) return;
  if (finished.value && !reset) return;

  const targetPage = reset ? 1 : page.value;
  const currentToken = Symbol("infinite-fetch");
  fetchToken.value = currentToken;
  loading.value = true;

  try {
    const response = await props.fetcher({
      page: targetPage,
      pageSize: props.pageSize,
      reset,
    });
    if (fetchToken.value !== currentToken) return;
    const list = response;
    if (reset) {
      setItems(list);
    } else {
      items.value = items.value.concat(list);
    }
    finished.value = list.length < props.pageSize;
    if (!finished.value) {
      page.value = targetPage + 1;
    }
    emit("load", { items: list, reset });
  } catch (error) {
    emit("error", error);
    throw error;
  } finally {
    if (fetchToken.value === currentToken) {
      loading.value = false;
    }
  }
};

const loadMore = () => fetchData(false);

const reload = () => {
  resetState();
  return fetchData(true);
};

const handleEndReached = (direction: ScrollbarDirection) => {
  if (direction !== props.trigger || !props.autoLoadMore) return;
  loadMore().catch(() => {});
};

const handleScroll = (payload: { scrollTop: number; scrollLeft: number }) => {
  emit("scroll", payload);
};

onMounted(() => {
  loading.value = false;
  if (props.autoLoad) {
    reload().catch(() => {});
  }
});

defineExpose({
  scrollbarRef,
  items,
  loading,
  finished,
  page,
  reload,
  loadMore,
  setItems,
  mutateItems,
});
</script>

<style scoped lang="scss">
.infinite-scrollbar {
  width: 100%;
}
</style>
