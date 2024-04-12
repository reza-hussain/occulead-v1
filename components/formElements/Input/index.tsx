import { KeyboardEvent, useEffect, useRef } from "react";

// types
import { InputProps } from "types/components/formElements/input";

const Input: React.FC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  label = "",
  type = "text",
  name,
  value = "",
  isError = false,
  errorMessage = "",
  onChangeValue = () => {},
  mandatory = false,
  isDisable = false,
  icon = false,
  mobileNo = false,
  isInSidebar = false,
  customStyles = {},
  iconClass = "",
  inputErrorStyles = {},
  disableStyles = false,
  link = false,
  customClassName = "",
  className = "",
  ...rest
}) => {
  const inputTag = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputTag?.current) {
      if (icon) {
        inputTag.current.style.paddingLeft = "33px";
      } else if (mobileNo) {
        inputTag.current.style.paddingLeft = "65px";
      } else {
        inputTag.current.style.paddingLeft = "16px";
      }
    }
  }, [icon, mobileNo]);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (type === "number") {
      const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

      // Allow shortcuts like Ctrl+A, Ctrl+C, Ctrl+V, etc.
      if (e.ctrlKey || e.metaKey) {
        return;
      }

      // Check if the pressed key is a number or a navigation key (arrow keys, delete, backspace, etc.)
      if (
        (e.key && allowedKeys.includes(e.key)) ||
        [
          "ArrowLeft",
          "ArrowRight",
          "Delete",
          "Backspace",
          "Tab",
          "Home",
          "End"
        ].includes(e.key)
      ) {
        return;
      }
    }
  };
  return (
    <div
      className={`relative w-full flex flex-col justify-center items-start gap-1 ${className}`}
      style={customStyles}
    >
      {label && (
        <label className="text-sm text-gray-400 pb-1 whitespace-nowrap">
          {label}
          {mandatory && <p>*</p>}
        </label>
      )}

      <div className="w-full dflex-start focus:outline">
        <input
          {...rest}
          className={`w-full dflex-center h-[44px] focus:outline-2 focus:outline-themeBlue text-black p-3 border border-borderColor rounded-md ${customClassName}`}
          ref={inputTag}
          type={type}
          value={value}
          onChange={onChangeValue}
          name={name}
          onKeyDown={handleKeyDown}
          disabled={isDisable}
          onWheel={(event) => {
            event?.currentTarget?.blur();
          }}
        />
      </div>

      {isError && (
        <span
          className="absolute bottom-0 text-red-600 text-sm"
          style={inputErrorStyles}
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default Input;
