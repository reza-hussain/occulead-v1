/* eslint-disable no-unsafe-optional-chaining */
import { useState, useRef } from "react";
import {
  InputActionMeta,
  default as ReactSelect,
  components,
  OnChangeValue,
  Props as ReactSelectProps,
  StylesConfig
} from "react-select";

// types
import { OptionType } from "@/types/components/formElements/Select";

type ComponentProps = {
  label: string;
  className?: string;
  onChangeValue: (val: OptionType[]) => void;
  onInputChange?: (val: string) => void;
  options: OptionType[];
  value: any[];
  isSelectAll: boolean;
} & ReactSelectProps;

const MultiSelect: React.FC<ComponentProps> = ({
  label = "select",
  className,
  isSelectAll = true,
  ...props
}) => {
  const [selectInput, setSelectInput] = useState("");
  const isAllSelected = useRef(false);
  const selectAllLabel = useRef("Select all");
  const allOption = { value: "*", label: selectAllLabel?.current };

  const filterOptions = (options: OptionType[], input: string) => {
    return options?.filter((option) =>
      option?.label?.toLowerCase()?.includes(input?.toLowerCase())
    );
  };

  const comparator = (v1: OptionType, v2: OptionType) => {
    return v1?.label?.localeCompare(v2?.label);
  };

  // const scrollParentRef = useRef();

  const filteredOptions = filterOptions(props?.options || [], selectInput);
  const filteredSelectedOptions = filterOptions(props?.value, selectInput);

  // console.log(props?.data);

  const Option: React.FC<any> = (props) => (
    <components.Option
      {...props}
      className="w-full hover:bg-blue-100 cursor-pointer"
    >
      {props?.value === "" &&
      !isAllSelected?.current &&
      filteredSelectedOptions?.length > 0 ? (
        <>
          <input
            key={props?.value}
            type="checkbox"
            ref={(input) => {
              if (input) input.indeterminate = true;
            }}
          />
          <label htmlFor={props?.value}></label>
        </>
      ) : (
        <div
          className="custom"
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <input
            key={props?.value}
            type="checkbox"
            className="multi-checkbox"
            checked={props?.isSelected || isAllSelected?.current}
            onChange={() => {}}
            style={{
              cursor: "pointer"
            }}
          />
          <label htmlFor={props?.value}></label>
        </div>
      )}
      <label className="w-full cursor-pointer">{props?.label}</label>
    </components.Option>
  );
  const Input: React.FC<any> = (props) => (
    <>
      {selectInput.length === 0 ? (
        <components.Input autoFocus={props.selectProps.menuIsOpen} {...props}>
          {props.children}
        </components.Input>
      ) : (
        <div style={{}}>
          <components.Input autoFocus={props.selectProps.menuIsOpen} {...props}>
            {props.children}
          </components.Input>
        </div>
      )}
    </>
  );

  const customFilterOption = ({ value, label }: OptionType, input: string) =>
    (value !== "*" && label.toLowerCase().includes(input.toLowerCase())) ||
    (value === "*" && filteredOptions?.length > 0);

  const onInputChange = (inputValue: string, event: InputActionMeta) => {
    if (props?.onInputChange) props?.onInputChange(inputValue);
    if (event.action === "input-change") setSelectInput(inputValue);
    else if (event.action === "menu-close" && selectInput !== "") {
      setSelectInput("");
      props?.onInputChange?.("");
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === " " || e.key === "Enter") && !selectInput)
      e.preventDefault();
  };

  const handleChange = (selected: OnChangeValue<OptionType[], false>) => {
    if (
      selected &&
      selected?.length > 0 &&
      !isAllSelected.current &&
      (selected[selected.length - 1].value === allOption.value ||
        JSON.stringify(filteredOptions) ===
          JSON.stringify([...selected].sort(comparator)))
    )
      return props?.onChangeValue(
        [
          ...(props?.value ?? []),
          ...props?.options.filter(
            ({ label }: OptionType) =>
              label.toLowerCase().includes(selectInput?.toLowerCase()) &&
              (props.value ?? []).filter(
                (opt: OptionType) => opt.label === label
              )?.length === 0
          )
        ].sort(comparator)
      );
    else if (
      selected &&
      selected.length > 0 &&
      selected[selected.length - 1].value !== allOption.value &&
      JSON.stringify([...selected].sort(comparator)) !==
        JSON.stringify(filteredOptions)
    )
      return props.onChangeValue(selected);
    else {
      return props.onChangeValue([
        ...props.value?.filter(
          ({ label }: OptionType) =>
            !label.toLowerCase().includes(selectInput?.toLowerCase())
        )
      ]);
    }
  };

  const customStyles: StylesConfig = {
    multiValueLabel: (def) => ({
      ...def,
      backgroundColor: "#E7EFFF",
      color: "black"
    }),
    multiValueRemove: (def) => ({
      ...def,
      backgroundColor: "#E7EFFF"
    }),
    valueContainer: (base) => ({
      ...base,
      height: "100%",
      overflow: "auto",
      border: "1px solid #D5DBDC",
      borderRadius: "0.375rem"
    }),
    option: (styles) => {
      return {
        ...styles,
        background: "var(--notify-bg-color)",
        color: "var(--light4-text-color)",
        fontSize: "0.875rem",
        padding: "0.75rem",
        linHeight: "1.225rem",
        display: "flex",
        alignItems: "center",
        gap: "0.8rem"
      };
    },
    indicatorsContainer: (def) => ({
      ...def,
      display: "none"
    }),
    menu: (def) => ({ ...def, zIndex: 9999 }),
    control: (def) => ({
      ...def,
      height: 44,
      maxHeight: 44,
      border: "none"
    })
  };

  const isValueSelected =
    props?.value?.length &&
    Object.values(props?.value?.[0]).some((item: any) => item?.length !== 0);

  if (isSelectAll && props?.options?.length > 0) {
    isAllSelected.current =
      JSON.stringify(filteredSelectedOptions) ===
      JSON.stringify(filteredOptions);

    if (filteredSelectedOptions?.length > 0) {
      if (filteredSelectedOptions?.length === filteredOptions?.length)
        selectAllLabel.current = `All (${filteredOptions.length}) selected`;
      else
        selectAllLabel.current = `${filteredSelectedOptions?.length} / ${filteredOptions.length} selected`;
    } else selectAllLabel.current = "Select all";

    return (
      <div
        className={`flex flex-col dflex-center text-black relative w-full gap-1 ${className}`}
      >
        <p className="w-full pb-1 text-sm text-gray-400 whitespace-nowrap">
          {label}
          {props?.required && <span>*</span>}
        </p>

        <ReactSelect
          {...props}
          autoFocus={false}
          inputValue={selectInput}
          onInputChange={onInputChange}
          onKeyDown={onKeyDown}
          options={[
            ...(props?.options ?? [
              {
                label: "",
                value: ""
              }
            ])
          ]}
          onChange={(selected: unknown) =>
            handleChange(selected as OnChangeValue<OptionType[], false>)
          }
          components={{
            Option,
            Input,

            ...props?.components
          }}
          value={isValueSelected ? props?.value : null}
          filterOption={customFilterOption}
          menuPlacement={props.menuPlacement ?? "auto"}
          styles={customStyles}
          isMulti
          classNamePrefix="custom-multi-select"
          closeMenuOnSelect={false}
          tabSelectsValue={true}
          backspaceRemovesValue={false}
          hideSelectedOptions={false}
          blurInputOnSelect={false}
          className="multiSelect w-full"
          // menuIsOpen={true}
          menuShouldScrollIntoView={true}
        />
      </div>
    );
  }

  return;
};

export default MultiSelect;
