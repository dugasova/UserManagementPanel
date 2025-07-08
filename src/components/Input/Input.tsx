import React from "react";
import "./styles.scss";

interface InputProps {
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  ref: React.Ref<HTMLInputElement>;
  placeholder?: string;
}

export default function Input({ type = "text", onChange, onBlur, value, ref, placeholder }: InputProps) {
  return (
    <input
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      ref={ref}
      placeholder={placeholder}
      className="input-field"
    />
  );
}
