import { FC, PropsWithChildren, ReactElement } from "react";

const LandingTemplate: FC<PropsWithChildren> = ({ children }): ReactElement => {
  return <div>{children}</div>;
};

export default LandingTemplate;
