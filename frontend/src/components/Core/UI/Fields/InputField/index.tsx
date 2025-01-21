import React, { InputHTMLAttributes } from "react";
import clsx from "clsx";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement>;

const InputField = React.forwardRef<
  HTMLInputElement,
  Omit<InputFieldProps, "ref">
>((props: InputFieldProps, ref) => {
  const { className, ...otherProps } = props;

  return (
    <input
      ref={ref}
      className={clsx(
        "px-3 py-1.5 outline-none rounded-md border border-solid border-neutral-98 focus:border-primary-400 font-normal text-sm",
        className
      )}
      {...otherProps}
    />
  );
});

export default InputField;
