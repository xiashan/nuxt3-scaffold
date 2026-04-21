<!--
 * @Author: lishaonan lishaonan@noxgroup.com
 * @Date: 2025-04-21 11:14:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2026-04-21 15:22:53
 * @Description: 控制台侧边栏
 *
 * Copyright (c) 2025 by NoxGroup, All Rights Reserved.
-->
<template>
  <el-aside class="console-aside">
    <el-menu
      ref="menuRef"
      class="console-menu"
      :default-openeds="openGroups"
      :default-active="activeIndex"
      @close="handleSubmenuClose"
      @select="handleSelect"
    >
      <el-menu-item :index="searchItem.to" class="console-aside__search">
        <AiIcon name="avatar" :size="16" />
        <span>{{ $t("smartAgent") }}</span>
      </el-menu-item>
      <el-sub-menu
        v-for="section in menuSections"
        :key="section.key"
        :index="section.key"
        :class="section.key"
      >
        <template #title>
          {{ t(section.titleKey) }}
        </template>
        <el-menu-item
          v-for="item in section.items"
          :key="item.to"
          :index="item.to"
        >
          {{ t(item.labelKey) }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
    <div class="console-aside__avatar">
      <UserProfile type="console"></UserProfile>
    </div>
  </el-aside>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const menuRef = useTemplateRef("menuRef");

const menuSections = [
  {
    key: "discovery",
    titleKey: "console.aside.discovery",
    items: [
      {
        labelKey: "console.aside.aiFilterSearch",
        to: "/influencer/search",
      },
      {
        labelKey: "console.aside.aiPoweredLeads",
        to: "/influencer/smart_leads",
      },
      {
        labelKey: "console.aside.brandInsights",
        to: "/influencer/brand_insights",
      },
      {
        labelKey: "console.aside.similarityMatch",
        to: "/influencer/match",
      },
    ],
  },
  {
    key: "management",
    titleKey: "console.aside.management",
    items: [
      {
        labelKey: "console.aside.myInfluencerHub",
        to: "/management/crm",
      },
    ],
  },
  {
    key: "outreach",
    titleKey: "console.aside.outreach",
    items: [
      {
        labelKey: "console.aside.emailTemplates",
        to: "/outreach/marketing_task",
      },
      {
        labelKey: "console.aside.messages",
        to: "/outreach/inbox",
      },
    ],
  },
  {
    key: "analytics",
    titleKey: "console.aside.aiPoweredAnalytics",
    items: [
      {
        labelKey: "console.aside.marketingInsights",
        to: "/analytics/product_analysis",
      },
      {
        labelKey: "console.aside.channelInsights",
        to: "/analytics/channel_analysis",
      },
      {
        labelKey: "console.aside.videoPerformance",
        to: "/analytics/analytical_report",
      },
      {
        labelKey: "console.aside.brandAnalytics",
        to: "/analytics/brand_analysis",
      },
    ],
  },
  {
    key: "tools",
    titleKey: "console.aside.aiTools",
    items: [
      {
        labelKey: "console.aside.feasibilityAssessment",
        to: "/tools/examine",
      },
      {
        labelKey: "console.aside.campaignPlanning",
        to: "/tools/plan",
      },
      {
        labelKey: "console.aside.influencerQuotes",
        to: "/tools/rate",
      },
      {
        labelKey: "console.aside.contactExtractor",
        to: "/tools/extractor",
      },
    ],
  },
];

const searchItem = {
  to: "/chat",
};

const pathEqual = (path: string) => {
  return route.path.includes(path);
};

// 全部展开
const openGroups = computed(() =>
  menuSections
    .filter((section) => section.key !== "tools")
    .map((section) => section.key),
);

// 选中状态
const activeIndex = computed(() => {
  const flatItems = menuSections.flatMap((section) => section.items);
  const currentMenuItem = flatItems.find((item) => pathEqual(item.to));

  if (route.path.includes("/chat")) {
    return searchItem.to;
  }

  return currentMenuItem?.to ?? "";
});

const handleSelect = async (index: string) => {
  if (index && !pathEqual(index)) {
    await navigateTo(localePath(index));
  }
};

const handleSubmenuClose = (index: string) => {
  if (index && index !== "tools") {
    menuRef.value?.open(index);
  }
};

if (route.meta.key === "console-index") {
  await navigateTo(localePath(`/influencer/search`), {
    replace: true,
  });
}
</script>

<style scoped lang="scss">
.console-aside {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 100%;
  border-right: 1px solid var(--el-border-color);

  .el-menu {
    --el-menu-border-color: transparent;
    --el-menu-item-height: 30px;
    --el-menu-sub-item-height: calc(var(--el-menu-item-height) + 2px);
    --el-menu-text-color: var(--el-text-color-secondary);
    --el-menu-hover-bg-color: transparent;
    --el-menu-icon-width: 16px;
    --el-menu-base-level-padding: 28px;
    --el-menu-level-padding: 14px;
    --el-menu-active-color: var(--el-color-primary);
    --el-menu-item-font-size: var(--el-font-size-small);

    flex: 1;
    min-height: 0;
    overflow-y: auto;
    border-right: none;

    .console-aside__search {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 34px;
      margin: 14px 16px 7px;
      color: var(--el-color-primary);
      border: 1px solid var(--el-color-primary);
      border-radius: 8px;

      &:hover {
        color: #d9790199;
        border-color: #d9790199;
      }

      &.is-active {
        color: var(--el-color-primary);
        background-color: var(--el-color-primary-lighter);
        border: 1px solid var(--el-color-primary);
      }
    }

    .console-menu__tools {
      padding-right: 12px;
      color: var(--el-text-color-primary);

      &:hover {
        color: var(--el-color-primary);
        background-color: transparent;
      }

      .console-menu__poper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }
    }

    :deep(.el-sub-menu) {
      margin-bottom: 2px;

      // 一级标题：深灰 + 顶部边框
      .el-sub-menu__title {
        margin-bottom: 2px;
        cursor: default;

        .el-sub-menu__icon-arrow {
          display: none;
        }
      }

      &.tools {
        .el-sub-menu__title {
          cursor: pointer;

          &:hover {
            color: var(--el-color-primary);
          }

          .el-sub-menu__icon-arrow {
            display: block;
            color: #333;
          }
        }
      }

      // 二级菜单：黑色，hover浅灰背景，选中橙色高亮
      .el-menu-item {
        @include font-base;

        color: var(--el-text-color-primary);
        border-left: 3px solid var(--el-bg-color-page);

        &:hover {
          color: var(--el-color-primary);
        }

        &.is-active {
          color: var(--el-color-primary);
          background-color: var(--el-color-primary-lighter);
          border-left-color: var(--el-color-primary);
        }
      }
    }
  }

  .console-aside__avatar {
    margin: 14px 0 14px 17px;
  }
}
</style>
