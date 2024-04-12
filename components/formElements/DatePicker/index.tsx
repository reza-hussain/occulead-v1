import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  label: string;
  className?: string;
  showTimeSelect?: boolean;
  validate?: any;
  error?: any;
  onChange?: (props?: any) => void;
  value: Date | null;
}

const DatePicker: React.FC<DatePickerProps> = ({
  className,
  label,
  showTimeSelect = false,
  onChange = () => {},
  value
}) => {
  const [date, setDate] = useState<Date | null>(value);

  return (
    <div
      className={`flex flex-col items-center justify-center text-black ${className} relative w-full gap-1`}
    >
      <h3 className="w-full pb-1 text-sm text-gray-400 whitespace-nowrap">
        {label}
      </h3>
      <div className="w-full">
        <ReactDatePicker
          className="w-full p-[12px] focus:outline-2 focus:outline-themeBlue border border-borderColor rounded-md appearance-none h-[44px]"
          selected={date}
          placeholderText="DD-MM-YYYY"
          showTimeSelect={showTimeSelect}
          showYearDropdown
          yearDropdownItemNumber={100}
          scrollableYearDropdown
          onChange={(date: Date) => {
            setDate(date);
            onChange(date);
          }}
        />
      </div>
    </div>
  );
};

export default DatePicker;
