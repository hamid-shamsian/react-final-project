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

const farsiNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export const farsify = (number: number) => {
  const stringified = String(number);
  const result = [];
  let j = 0;

  for (let i = stringified.length - 1; i > -1; i--) {
    result.unshift(farsiNumbers[+stringified[i]]);
    if (++j % 3 == 0 && i > 0) result.unshift(",");
  }

  return result.join("");
};
