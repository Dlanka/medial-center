import React from "react";

const Icon = ({ name }: { name: string }) => {
  const IconComponent = React.lazy(() => import(`@/assets/icons/${name}.svg`));

  return (
    <div className="svg-icon">
      <React.Suspense>
        <IconComponent />
      </React.Suspense>
    </div>
  );
};

export default Icon;
