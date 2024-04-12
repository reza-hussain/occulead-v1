import React from "react";

// components
import Select from "@/components/formElements/Select";

// types
import { OptionType } from "types/components/formElements/Select";

interface ComponentProps {
  options: OptionType[];
  onChange: (val: string, data: any) => void;
  value: string;
  data: any;
}

const TableDropdown: React.FC<ComponentProps> = ({
  options,
  onChange,
  value,
  data
}) => {
  return (
    <Select
      label=""
      id="companyStatusDropdown"
      placeholder=""
      onChange={(val: string) => onChange(val, data)}
      value={
        options?.filter((option) => option.value === String(value))?.[0]?.label
      }
      options={options}
      showSearch={false}
    />
  );
};

export default TableDropdown;
