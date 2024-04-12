import { GetServerSidePropsContext } from "next";
import { getCookie } from "cookies-next";

// type DebounceFunction  = (func: () => void, delay: number) => Function;
// types
import { OptionType } from "@/types/components/formElements/Select";

export const debounce: any = (func: () => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return () => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func();
    }, delay);
  };
};

export const createDropdownOptions = (
  arr: Array<string | any>,
  label?: string,
  value?: string
): OptionType[] => {
  const set = new Set(arr);
  return Array.from(set).map((item) => {
    if (label && value) {
      const options = {
        label: item[label],
        value: item[value]
      };

      return options;
    }

    const options = {
      label: item,
      value: item
    };
    return options;
  });
};

export const getSSRHeaders = (
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"]
) => {
  const token = getCookie("token", { req, res });

  return {
    Authorization: `Bearer ${token}`
  };
};
