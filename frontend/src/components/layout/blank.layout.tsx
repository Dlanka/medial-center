import React from "react";

type IProps = {
  children: React.ReactNode;
};

const Blank = ({ children, ...rest }: IProps) => {
  return <div {...rest}>{children}</div>;
};

export default Blank;
