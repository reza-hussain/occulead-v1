import Cookie from "cookies-next";
import {
  getCookie as getCookieToken,
  setCookie,
  deleteCookie as deleteCookieToken
} from "cookies-next";

export const getCookie = (key: string) => {
  const storage = getCookieToken(key);
  return storage || "";
};

export const cookieExist = (key: string) => {
  const json = Cookie?.hasCookie(key);
  return json || {};
};

export const deleteCookie = (key: string) => {
  deleteCookieToken(key);
  return getCookie(key) === "";
};

export const saveCookie = (key: string, value: string, options = {}) => {
  setCookie(key, value, options);
  return getCookie(key) !== "";
};

export const mapObjectKeys = (values: string) => {
  return values
    ? Object.entries(values).map(([key, value]) => {
        return {
          label: value.toLowerCase() ?? 0,
          value: key ?? 0
        };
      })
    : [];
};
