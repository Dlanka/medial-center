import { InputHTMLAttributes } from "react";
import clsx from "clsx";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement>;

const InputField = (props: InputFieldProps) => {
  const { className, ...rest } = props;

  return (
    <input
      className={clsx(
        "px-3 py-1.5 outline-none rounded-md border border-solid border-neutral-98 focus:border-primary-400 font-normal text-sm",
        className
      )}
      {...rest}
    />
  );
};

export default InputField;
