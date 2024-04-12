import React from "react";

interface TextAreaProps {
  id: string;
  value: string;
  cls?: string;
}

const TextArea: React.FC<
  TextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ id, value, onChange, cls }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center basis-[100%] ${cls}`}
    >
      <label className="w-full text-sm text-gray-400 pb-1 whitespace-nowrap">
        Description
      </label>
      <textarea
        onChange={onChange}
        value={value}
        rows={4}
        placeholder="Enter Clinic Description"
        className="w-full p-[12px] border border-gray-200 rounded-md focus:border-themeBlue"
      />
    </div>
  );
};

export default TextArea;
