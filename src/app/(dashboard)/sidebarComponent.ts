import {
  CiBookmark,
  CiShoppingTag,
  CiUser,
  CiViewList,
  CiWallet,
} from "react-icons/ci";

export const memberItems = [
  {
    key: "transaction",
    label: "Transaction",
    href: "/member/transaction",
    icon: CiWallet,
  },
  {
    key: "profile",
    label: "Profile",
    href: "/member/profile",
    icon: CiUser,
  },
];

export const adminItems = [
  {
    key: "event",
    label: "Event",
    href: "/admin/event",
    icon: CiViewList,
  },
  {
    key: "category",
    label: "Category",
    href: "/admin/category",
    icon: CiShoppingTag,
  },
  {
    key: "banner",
    label: "Banner",
    href: "/admin/banners",
    icon: CiBookmark,
  },
  {
    key: "transaction",
    label: "Transaction",
    href: "/admin/transaction",
    icon: CiWallet,
  },
];
