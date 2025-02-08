import Icon from "@/components/Core/Icon";
import { Link, LinkProps } from "@tanstack/react-router";
import clsx from "clsx";

type IProps = {
  iconName: string;
} & LinkProps;
const MenuItem = (props: IProps) => {
  const { iconName, ...otherProps } = props;
  return (
    <Link
      className={clsx(
        "rounded h-8 w-8 flex items-center justify-center text-icon-24 text-neutral-20 hover:bg-primary-90 hover:text-primary-400 [&.active]:text-white [&.active]:bg-primary-400"
      )}
      {...otherProps}
    >
      <Icon name={iconName} />
    </Link>
  );
};

export default MenuItem;
