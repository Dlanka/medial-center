import clsx from "clsx";
import React from "react";

type FieldGroupProps = {
  label?: string;
  children?: React.ReactNode;
  className?: string;
  isReq?: boolean;
  error?: string | any;
};

const FieldGroup = (props: FieldGroupProps) => {
  const { label, children, className, isReq, error } = props;

  return (
    <div className={clsx("grid gap-1 grid-rows-0", className)}>
      {label ? (
        <label className="text-neutral-20 font-primary text-sm">
          {label}
          {isReq ? <span className="text-xs text-[red]">*</span> : null}
        </label>
      ) : null}

      <div className="grid grid-rows-0">
        {children}

        {error ? (
          <div className="error-element mt-1">
            <span className="block text-xs text-error-400">{error}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FieldGroup;
