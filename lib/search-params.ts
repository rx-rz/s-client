import { useSearchParams, useRouter } from "next/navigation";

export const manageSearchParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const params = new URLSearchParams(searchParams.toString());

  function addSearchParam(name: string, value: string) {
    params.set(name, value);
  }

  function removeSearchParam(name: string) {
    params.delete(name);
  }

  function clearSearchParams() {
    params.forEach((value, key) => {
      params.delete(key);
    });
  }

  function navigateWithParams(pathname = "", replace = false) {
    const url = `${pathname}?${params.toString()}`;

    if (replace) {
      router.replace(url);
    } else {
      router.push(url);
    }
  }

  return {
    searchParams,
    addSearchParam,
    removeSearchParam,
    clearSearchParams,
    navigateWithParams,
  };
};
