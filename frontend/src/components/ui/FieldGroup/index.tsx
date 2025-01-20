import clsx from "clsx";
import React from "react";

type FieldGroupProps = {
  label?: string;
  children?: React.ReactNode;
  className?: string;
  isReq?: boolean;
};

const FieldGroup = (props: FieldGroupProps) => {
  const { label, children, className, isReq } = props;

  return (
    <div className={clsx("grid gap-1", className)}>
      {label ? (
        <label className="text-neutral-20 font-primary text-sm">
          {label}
          {isReq ? <span className="text-xs text-[red]">*</span> : null}
        </label>
      ) : null}

      <div className="grid">{children}</div>
    </div>
  );
};

export default FieldGroup;
