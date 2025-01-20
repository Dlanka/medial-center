import React from "react";

type IProps = {
  children: React.ReactNode;
};

const Main = ({ children }: IProps) => {
  return <div>{children}</div>;
};

export default Main;
