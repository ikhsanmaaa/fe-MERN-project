import { Metadata } from "next";
import Creator from "./creator";
export const metadata: Metadata = {
  title: "Creator",
  description: "About Creator",
};
const CreatorPage = () => {
  return (
    <>
      <Creator />
    </>
  );
};

export default CreatorPage;
