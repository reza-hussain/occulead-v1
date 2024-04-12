import type * as CSS from "csstype";

export type InputProps = {
  customClassName?: string;
  label: string;
  name?: string;
  value: string | null;
  isError?: boolean;
  errorMessage?: string;
  onChangeValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mandatory?: boolean;
  isDisable?: boolean;
  icon?: boolean;
  mobileNo?: boolean;
  isInSidebar?: boolean;
  customStyles?: CSS.Properties;
  iconClass?: string;
  inputErrorStyles?: {};
  disableStyles?: boolean;
  link?: boolean;
};
