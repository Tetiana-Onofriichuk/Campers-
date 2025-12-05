"use client";

import { forwardRef } from "react";
import { useField, useFormikContext } from "formik";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./BookingForm.module.css";

type Props = {
  name: string;
};

export default function DatePickerField({ name }: Props) {
  const { setFieldValue } = useFormikContext<any>();
  const [field, meta] = useField<string>(name);

  const selectedDate = field.value ? new Date(field.value) : null;
  const hasError = !!meta.error && meta.touched;

  return (
    <div className={css.field}>
      <ReactDatePicker
        selected={selectedDate}
        onChange={(date: Date | null) =>
          setFieldValue(name, date ? date.toISOString() : "")
        }
        dateFormat="dd.MM.yyyy"
        placeholderText="Booking date*"
        customInput={
          <CustomInput hasError={hasError} placeholder="Booking date*" />
        }
        calendarStartDay={1}
      />

      {hasError && <span className={css.error}>{meta.error}</span>}
    </div>
  );
}

type CustomInputProps = {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
  hasError?: boolean;
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick, placeholder, hasError }, ref) => {
    return (
      <input
        ref={ref}
        onClick={onClick}
        readOnly
        value={value || ""}
        placeholder={placeholder}
        className={`${css.input} ${hasError ? css.inputError : ""}`}
      />
    );
  }
);

CustomInput.displayName = "CustomInput";
