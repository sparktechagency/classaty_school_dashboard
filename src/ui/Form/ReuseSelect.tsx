/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form, Select, Typography } from "antd";
import React from "react";
import { cn } from "../../lib/utils";

const { Option } = Select;

type TSelectProps = {
  showSearch?: boolean;
  Typolevel?: 1 | 2 | 3 | 4 | 5;
  label?: React.ReactNode;
  name: string;
  rules?: Array<Record<string, any>>;
  placeholder?: string;
  disabled?: boolean;
  options: any[];
  value?: any;
  loading?: boolean;
  onChange?: (value: any) => void;
  filterOption?: (inputValue: string, option: any) => boolean;
  allowClear?: boolean;
  mode?: "multiple" | undefined;
  wrapperClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
  defaultValue?: any;
  prefix?: React.ReactNode | null;
  optionFilterProp?: string;
};

const ReuseSelect = ({
  showSearch = false,
  Typolevel = 5,
  label,
  name,
  rules = [],
  placeholder,
  disabled,
  options,
  value,
  loading = false,
  onChange,
  filterOption,
  allowClear = false,
  mode,
  wrapperClassName,
  labelClassName,
  selectClassName,
  defaultValue = "",
  prefix,
  optionFilterProp,
}: TSelectProps) => {
  return (
    <div className={cn(wrapperClassName)}>
      {label && (
        <Typography.Title
          level={Typolevel}
          className={cn("!text-base-color !font-normal", labelClassName)}
        >
          {label}
        </Typography.Title>
      )}
      <Form.Item name={name} rules={rules}>
        <Select
          showSearch={showSearch}
          filterOption={filterOption}
          optionFilterProp={optionFilterProp}
          loading={loading}
          mode={mode}
          className={cn(
            "!h-12 !text-secondary-color !bg-[#EFEFEF] !ring-0 rounded-md ",
            selectClassName
          )}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          allowClear={allowClear}
          onChange={onChange}
          defaultValue={defaultValue}
          prefix={prefix}
        >
          {options?.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

export default ReuseSelect;
