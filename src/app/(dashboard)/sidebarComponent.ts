import {
  CiBookmark,
  CiGrid41,
  CiSettings,
  CiShoppingTag,
  CiViewList,
  CiWallet,
} from "react-icons/ci";

export const memberItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/member",
    icon: CiGrid41,
  },
  {
    key: "setting",
    label: "Setting",
    href: "/member/setting",
    icon: CiSettings,
  },
  {
    key: "transaction",
    label: "Transaction",
    href: "/member/transaction",
    icon: CiWallet,
  },
];

export const adminItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin",
    icon: CiGrid41,
  },
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
    href: "/admin/banner",
    icon: CiBookmark,
  },
  {
    key: "transaction",
    label: "Transaction",
    href: "/member/transaction",
    icon: CiWallet,
  },
];
