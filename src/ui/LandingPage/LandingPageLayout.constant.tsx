import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/event" },
];

const BUTTON_ITEMS = [
  { label: "Register", href: "/auth/register", variant: "bordered" },
  { label: "Login", href: "/auth/login", variant: "solid" },
];

const SOCIAL_ITEMS = [
  {
    label: "Facebook",
    href: "https://facebook.com/acara",
    icon: <FaFacebook />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/acara",
    icon: <FaInstagram />,
  },
  {
    label: "Linkedin",
    href: "https://linkedin.com/acara",
    icon: <FaLinkedin />,
  },
];

export { NAV_ITEMS, BUTTON_ITEMS, SOCIAL_ITEMS };
