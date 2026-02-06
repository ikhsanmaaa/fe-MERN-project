import { Fragment, ReactNode } from "react";
import LandingPageNavbar from "./Navbar/Navbar";
import LandingPageFooter from "./LandingPageFooter/LandingPageFooter";

interface PropTypes {
  children: ReactNode;
}

const LandingPageLayout = (props: PropTypes) => {
  const { children } = props;
  return (
    <Fragment>
      <LandingPageNavbar />
      <div className="py-10 md:p-6">{children}</div>
      <LandingPageFooter />
    </Fragment>
  );
};

export default LandingPageLayout;
