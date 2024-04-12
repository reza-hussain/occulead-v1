import type * as CSS from "csstype";

export type OptionType = {
  label: string;
  value: string;
};

export type SelectProps = {
  value: string;
  label: string;
  id: string;
  className?: string;
  onChange: (val: any) => void;
  options: OptionType[];
  placeholder: string;
  disabled?: boolean;
  inputBoxStyles?: CSS.Properties;
  dropdownStyles?: CSS.Properties;
  dropdownClass?: string;
  isError?: boolean;
  errorMessage?: string;
  inputErrorClassName?: string;
  // isToggleFocus?: boolean;
  showSearch?: boolean;
  style?: CSS.Properties;
};
