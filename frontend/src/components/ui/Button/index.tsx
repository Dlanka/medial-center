import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type IProps = {
  variant?:
    | "primary"
    | "primary-light"
    | "secondary"
    | "secondary-light"
    | "neutral";
  size?: "sm" | "md" | "lg";
};

type ButtonProps = IProps & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  const {
    variant = "primary",
    size = "sm",
    children,
    className,
    ...rest
  } = props;

  const variantClz = React.useMemo(() => {
    switch (variant) {
      case "primary": {
        return "bg-primary-400 hover:bg-primary-500 text-primary-90";
      }
      case "primary-light": {
        return "bg-primary-90 hover:text-primary-500 text-primary-400";
      }

      case "secondary": {
        return "bg-secondary-400 hover:bg-secondary-500 text-secondary-90";
      }

      case "secondary-light": {
        return "bg-secondary-90 hover:text-secondary-500 text-secondary-400";
      }

      case "neutral": {
        return "text-neutral-20 hover:bg-neutral-98 ";
      }

      default: {
        return "";
      }
    }
  }, [variant]);

  const sizesClz = React.useMemo(() => {
    switch (size) {
      case "md": {
        return "px-3 py-2 text-sm";
      }
      default: {
        return "px-3 py-1 text-sm";
      }
    }
  }, [size]);

  return (
    <button
      className={clsx(
        "outline-none inline-flex items-center text-sm rounded-md font-normal",
        variantClz,
        sizesClz,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
