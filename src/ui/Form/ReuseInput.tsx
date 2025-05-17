/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form, Input, Typography } from "antd";
import React from "react";
import type { Rule } from "antd/es/form";
import { cn } from "../../lib/utils";

type TInputProps = {
  Typolevel?: 1 | 2 | 3 | 4 | 5;
  label?: React.ReactNode;
  name: string;
  rules?: Rule[];
  type?: string;
  placeholder: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
  value?: any;
  inputType?: "normal" | "password" | "textarea" | string;
  rows?: number;
  prefix?: React.ReactNode | null;
  suffix?: React.ReactNode | null;
  wrapperClassName?: string;
  formItemClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
};

const ReuseInput = ({
  Typolevel = 4,
  label,
  name,
  rules = [],
  type = "text",
  placeholder,
  disabled,
  onChange,
  value,
  inputType = "normal",
  rows = 4,
  prefix,
  suffix,
  wrapperClassName,
  formItemClassName,
  labelClassName,
  inputClassName,
}: TInputProps) => {
  return (
    <div className={cn(wrapperClassName)}>
      {label && (
        <Typography.Title
          level={Typolevel}
          className={cn("!text-base-color !font-bold", labelClassName)}
        >
          {label}
        </Typography.Title>
      )}
      <Form.Item className={cn(formItemClassName)} name={name} rules={rules}>
        {inputType === "password" ? (
          <Input.Password
            prefix={prefix}
            suffix={suffix}
            value={value}
            onChange={onChange}
            className={cn(
              "!py-2 !px-3 !rounded-lg !text-lg !bg-[#EFEFEF] !border !border-[#EFEFEF] !text-base-color",
              inputClassName
            )}
            placeholder={placeholder}
            disabled={disabled}
          />
        ) : inputType === "textarea" ? (
          <Input.TextArea
            value={value}
            onChange={onChange}
            className={cn(
              "!py-2 !px-3 !rounded-lg !text-lg !bg-[#EFEFEF] !border !border-[#EFEFEF] !text-base-color",
              inputClassName
            )}
            rows={rows}
            placeholder={placeholder}
            disabled={disabled}
          />
        ) : (
          <Input
            prefix={prefix}
            suffix={suffix}
            value={value}
            onChange={onChange}
            className={cn(
              "!py-2 !px-3 !rounded-lg !text-lg !bg-[#EFEFEF] !border !border-[#EFEFEF] !text-base-color",
              inputClassName
            )}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
          />
        )}
      </Form.Item>
    </div>
  );
};

export default ReuseInput;
