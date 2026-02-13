"use client";
import {
  Avatar,
  Button,
  ButtonProps,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Listbox,
  ListboxItem,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { BUTTON_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constant";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import useLandingPageLayoutNavbar from "../useLandingPageLayoutNavbar";
import { Fragment } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import { IEvent } from "@/types/Event";

const LandingPageNavbar = () => {
  const pathname = usePathname();
  const session = useSession();
  const {
    dataProfile,
    dataEventSearch,
    isLoadingEventSearch,
    isRefetchingEventSearch,
    search,
    setSearch,
    handleSearch,
  } = useLandingPageLayoutNavbar();

  const { handleClearSearch } = useChangeUrl();

  const isAdmin = dataProfile?.role === "admin";
  return (
    <Navbar
      maxWidth="full"
      className="max-w-screen-2xl 2xl:container"
      isBordered
      isBlurred={false}
      shouldHideOnScroll
    >
      <div className="flex items-center gap-8">
        <NavbarBrand as={Link} href="/">
          <Image
            src="/images/general/logo.png"
            alt="logo"
            width={100}
            height={50}
            className="cursor-pointer"
          />
        </NavbarBrand>

        <NavbarContent className="hidden lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavbarItem
              key={`nav-${item.label}`}
              as={Link}
              href={item.href}
              className={cn(
                "font-medium hover:text-danger",
                pathname === item.href
                  ? "font-bold text-danger-500"
                  : "text-default-700",
              )}
            >
              {item.label}
            </NavbarItem>
          ))}
        </NavbarContent>
      </div>
      <NavbarContent justify="end">
        <NavbarMenuToggle className="lg:hidden" />

        <NavbarItem className="hidden lg:flex relative">
          <Input
            isClearable
            className="w-[300px]"
            placeholder="Search Event"
            startContent={<CiSearch />}
            value={search}
            onChange={handleSearch}
            onClear={() => {
              setSearch("");
              handleClearSearch();
            }}
          />

          {search.trim() !== "" && (
            <div className="absolute w-full right-0 top-12 rounded-xl border bg-white">
              {isLoadingEventSearch || isRefetchingEventSearch ? (
                <div className="flex justify-center p-4">
                  <Spinner size="sm" color="danger" />
                </div>
              ) : dataEventSearch?.length ? (
                <Listbox
                  items={dataEventSearch}
                  aria-label="Search result"
                  className="flex items-center gap-2"
                >
                  {(item: IEvent) => (
                    <ListboxItem key={item._id} href={`/event/${item.slug}`}>
                      <div className="flex items-center gap-2">
                        <Image
                          src={`${item.banner}`}
                          alt={item.name}
                          width={100}
                          height={40}
                          className="w-2/5 rounded-md"
                        />

                        <p className="w-3/5 text-wrap">{item.name}</p>
                      </div>
                    </ListboxItem>
                  )}
                </Listbox>
              ) : (
                <div className="p-4 text-sm text-gray-500">No results</div>
              )}
            </div>
          )}
        </NavbarItem>

        {session.status === "authenticated" ? (
          <NavbarItem className="hidden lg:block">
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  src={dataProfile?.profilePicture}
                  className="cursor-pointer"
                  showFallback
                  name={dataProfile?.fullName}
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="role">
                  <Chip
                    avatar={
                      <Avatar
                        name={dataProfile?.username}
                        src={dataProfile?.profilePicture}
                      />
                    }
                    color={
                      dataProfile?.role === "member" ? "warning" : "danger"
                    }
                    variant="flat"
                  >
                    {dataProfile?.role}
                  </Chip>
                </DropdownItem>
                {isAdmin ? (
                  <>
                    <DropdownItem key="event" href="/admin/event">
                      Event
                    </DropdownItem>
                    <DropdownItem key="category" href="/admin/category">
                      Category
                    </DropdownItem>
                    <DropdownItem key="banner" href="/admin/banner">
                      Banner
                    </DropdownItem>
                    <DropdownItem key="transaction" href="/admin/transaction">
                      Transaction
                    </DropdownItem>
                  </>
                ) : (
                  <>
                    <DropdownItem key="member" href="member/transaction">
                      Transaction
                    </DropdownItem>
                    <DropdownItem key="profile" href="member/profile">
                      Profile
                    </DropdownItem>
                  </>
                )}

                <DropdownItem key="signout" onPress={() => signOut()}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <div className="hidden lg:gap-4 lg:flex">
            {BUTTON_ITEMS.map((item) => (
              <NavbarItem key={`button-${item.label}`}>
                <Button
                  as={Link}
                  color="danger"
                  href={item.href}
                  variant={item.variant as ButtonProps["variant"]}
                >
                  {item.label}
                </Button>
              </NavbarItem>
            ))}
          </div>
        )}

        <NavbarMenu className="gap-4">
          {NAV_ITEMS.map((item) => (
            <NavbarMenuItem
              key={`nav-${item.label}`}
              className={cn("font-medium text-default-700 hover:text-danger", {
                "font-bold text-danger": pathname === item.href,
              })}
            >
              <Link href={item.href}>{item.label}</Link>
            </NavbarMenuItem>
          ))}
          {session.status === "authenticated" ? (
            <Fragment>
              <NavbarMenuItem
                className={cn(
                  "font-medium text-default-700 hover:text-danger",
                  {
                    hidden: !isAdmin,
                  },
                )}
              >
                <Link href="admin/dashboard">Admin</Link>
              </NavbarMenuItem>

              <NavbarMenuItem className="font-medium text-default-700 hover:text-danger">
                <Link href="member/profile">Profile</Link>
              </NavbarMenuItem>

              <NavbarMenuItem>
                <Button
                  color="danger"
                  onPress={() => signOut()}
                  className="mt-2 w-full"
                  variant="bordered"
                  size="md"
                >
                  Logout
                </Button>
              </NavbarMenuItem>
            </Fragment>
          ) : (
            <Fragment>
              {BUTTON_ITEMS.map((item) => (
                <NavbarMenuItem key={`button-${item.label}`}>
                  <Button
                    as={Link}
                    color="danger"
                    href={item.href}
                    fullWidth
                    variant={item.variant as ButtonProps["variant"]}
                    size="md"
                  >
                    {item.label}
                  </Button>
                </NavbarMenuItem>
              ))}
            </Fragment>
          )}
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
};

export default LandingPageNavbar;
