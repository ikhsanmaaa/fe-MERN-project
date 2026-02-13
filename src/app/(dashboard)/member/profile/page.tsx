import { Metadata } from "next";
import PageHeader from "@/ui/PageHeader/PageHeader";
import Profile from "@/ui/MemberDahsboard/ProfileMember/Profile";
export const metadata: Metadata = {
  title: "Profile",
  description: "Update Profile Information",
};
const MemberProfilePage = () => {
  return (
    <>
      <PageHeader title="Profile" description="Update Profile Information" />
      <Profile />
    </>
  );
};

export default MemberProfilePage;
