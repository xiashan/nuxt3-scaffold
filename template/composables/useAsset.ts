/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-04-23 17:26:00
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-17 15:00:23
 * @FilePath: /ai-robot/composables/tool/useAsset.ts
 * @Description: 动态加载images目录下的图片
 */
export function useIcon(path: string): string {
  const assets = import.meta.glob(`~/assets/images/icon/**/*`, {
    eager: true,
    import: "default",
  });
  // @ts-expect-error: wrong type info
  return assets["/assets/images/icon/" + path + ".svg"];
}
