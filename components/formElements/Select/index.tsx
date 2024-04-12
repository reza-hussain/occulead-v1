import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// images
import { OptionType, SelectProps } from "types/components/formElements/Select";

const Select: React.FC<SelectProps> = ({
  value = "",
  label = "",
  id = "",
  className = "",
  onChange = (val: any) => {},
  options = [],
  placeholder = "",
  disabled = false,
  inputBoxStyles = {},
  dropdownStyles = {},
  dropdownClass = "",
  isError = false,
  errorMessage = "",
  inputErrorClassName = "",
  showSearch = true,
  style = {}
}) => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [query, setQuery] = useState<string>(placeholder || "");
  const [queryMode, setQueryMode] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] = useState<OptionType[]>([]);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  useEffect(() => {
    options?.length && setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    function closeDropDown(e: MouseEvent) {
      const element = e.target as Element;
      if (!element?.closest("#" + id)) {
        setQueryMode(false);
        setIsFocus(false);
        setShowDropDown(false);
        if (!filteredOptions?.length) {
          setFilteredOptions([...options]);
        }
      }
    }

    window.addEventListener("click", closeDropDown);

    return () => window.removeEventListener("click", closeDropDown);
  }, []);

  useEffect(() => {
    if (!showDropDown) {
      // setIsFocus(false);
    }
  }, [showDropDown]);

  const handleClick = () => {
    setFilteredOptions([...options]);
    if (!disabled) {
      setShowDropDown(!showDropDown);
      setIsFocus(true);
      return;
    }
  };

  const handleQuery = (query: string) => {
    setQueryMode(true);
    setQuery(query);
    setIsFocus(true);
    setShowDropDown(true);

    if (!query.trim() || !options?.length) {
      setFilteredOptions([...options]);
    } else {
      const tempOptions = options?.filter((option) => {
        return (
          option?.value
            ?.toString()
            .trim()
            .toLowerCase()
            .includes(query.trim().toLowerCase()) ||
          option?.label
            .toString()
            .trim()
            .toLowerCase()
            .includes(query.trim().toLowerCase())
        );
      });

      setFilteredOptions(tempOptions);
    }
  };

  const getLabel = () => {
    return options?.find((option) => option?.value === value)?.label ?? "";
  };

  return (
    <div
      className={`relative w-full leading-3 ${disabled ? "opacity-50" : ""} ${className}`}
      id={id}
      style={style}
    >
      <div className="w-full dflex-center flex-col gap-1">
        {label?.length > 0 && (
          <p className="w-full pb-1 text-sm text-gray-400 whitespace-nowrap">
            {label}
          </p>
        )}

        <div
          className={`w-full h-[44px] dflex-center p-3 bg-white rounded-md border border-borderColor ${isFocus ? "outline outline-themeBlue" : ""}`}
          id="focus"
          style={inputBoxStyles}
          onClick={handleClick}
        >
          {showSearch ? (
            <input
              onFocus={() => setIsFocus(true)}
              onChange={(e) => handleQuery(e.target.value)}
              value={queryMode ? query : getLabel()}
              className="w-full bg-white text-black text-base leading-5 border-none outline-none"
              placeholder={placeholder}
              disabled={disabled}
              autoComplete="off"
            />
          ) : (
            <div className="w-full bg-white text-black text-base leading-5 border-none outline-none">
              {value ?? " Select Country"}
            </div>
          )}
          {/* <Image onClick={handleClick} src={dropdown} alt="dropdown" /> */}
        </div>
      </div>

      {filteredOptions?.length > 0 && (
        <div
          className={`w-full max-h-72 absolute ${label?.length ? "top-20" : "top-14"} overflow-auto rounded-[0.5rem] bg-white border border-gray-300 
          z-[2] cursor-pointer shadow-[0rem_0.125rem_0.75rem_0rem_rgba(102,123,144,0.3)] custom-scroll ${dropdownClass} ${!showDropDown && "hidden"}`}
          style={dropdownStyles}
        >
          {filteredOptions?.map((option) => (
            <div
              key={uuidv4()}
              className={`p-4 text-base leading-[130%] text-gray-600 ${value === option.value ? "bg-themeBlue text-white" : ""} hover:bg-themeBlue hover:text-white`}
              onClick={() => {
                setQueryMode(false);
                setShowDropDown(false);
                onChange(option.value);
              }}
            >
              <p className="break-words">{option.label}</p>
            </div>
          ))}
          {!filteredOptions && (
            <div className="hidden p-4 text-base leading-[130%] text-black hover:bg-blue-400">
              No data
            </div>
          )}
        </div>
      )}
      {isError && (
        <p
          // className={`${styles.inputError} ${inputErrorClassName}`}
          className={`absolute bottom-0 errorMessage ${inputErrorClassName}`}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Select;
