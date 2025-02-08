import React from "react";
import clsx from "clsx";

import Icon from "../../Icon";

interface IconButtonProps<T extends React.ElementType> {
  as?: T;
  iconName: string;
  iconSize?: "12" | "16" | "20" | "24" | "28";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

function IconButton<T extends React.ElementType = "button">(
  props: IconButtonProps<T> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof IconButtonProps<T>>
) {
  const { as, iconName, className, iconSize = "24", size, ...rest } = props;

  const Component = as || "button";

  const iconSizeClz = React.useMemo(() => {
    switch (iconSize) {
      case "12":
        return "text-icon-12";
      case "16":
        return "text-icon-16";
      case "20":
        return "text-icon-20";
      case "28":
        return "text-icon-28";
      default:
        return "text-icon-24";
    }
  }, [iconSize]);

  const sizeClz = React.useMemo(() => {
    switch (size) {
      case "xs":
        return "size-3";
      case "sm":
        return "size-4";
      case "md":
        return "size-5";
      case "lg":
        return "size-6";
      case "xl":
        return "size-7";
      case "2xl":
        return "size-8";
      default:
        return "p-1";
    }
  }, [size]);

  return (
    <Component
      className={clsx(
        "rounded flex justify-center items-center text-neutral-20 hover:bg-neutral-900",
        iconSizeClz,
        sizeClz,
        className
      )}
      {...rest}
    >
      <Icon name={iconName} />
    </Component>
  );
}

export default IconButton;
