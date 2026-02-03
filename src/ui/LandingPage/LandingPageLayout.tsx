import { Fragment, ReactNode } from "react";
import PageHeader from "../PageHeader/PageHeader";

interface PropTypes {
  children: ReactNode;
}

const LandingPageLayout = (props: PropTypes) => {
  const { children } = props;
  return (
    <Fragment>
      <PageHeader title="Landing Page" description="Landing Page" />
      <div className="max-w-screen-2xl 2xl:container py-10 md: p-6 ">
        {children}
      </div>
    </Fragment>
  );
};

export default LandingPageLayout;
