import { lazy } from "react";

export const lazyImport = (path: string) => lazy(() => import(path));

export const updatePaginationParams = (prev: URLSearchParams, page: number, perPage: number) => {
  const updated = new URLSearchParams(prev);
  updated.set("perPage", String(perPage));
  updated.set("page", String(page));
  return updated;
};

// export const updateSearchParam = (prev: URLSearchParams, key: string, value: string) => {
//   const updated = new URLSearchParams(prev);
//   updated.set(key, String(value));
//   return updated;
// };
