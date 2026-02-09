"use client";

import {
  BreadcrumbItem,
  Breadcrumbs,
  Skeleton,
  Tab,
  Tabs,
} from "@heroui/react";
import useDetailEvent from "./useDetailEvent";
import { FaClock, FaLocationArrow } from "react-icons/fa";
import { convertTime } from "@/utils/date";
import Image from "next/image";
import { ITicketsPayload } from "@/types/Ticket";
import DetailEventTicket from "../DetailEventTicket/DetailEventTicket";
import DetailEventCart from "../DetailEventCart/DetailEventCart";
import {
  CartSkeleton,
  EventDescriptionSkeleton,
  EventHeaderSkeleton,
  TicketListSkeleton,
} from "@/ui/SkeletonLoading/DetailEventSkeleton";
import Script from "next/script";
import environment from "@/config/environment";

const DetailEvent = () => {
  const {
    dataEvent,
    dataTicket,
    handleAddToCart,
    handleChangeQuantity,
    cart,
    setCart,
    dataTicketInCart,
    handleCreateOrder,
    isPendingCreateOrder,
  } = useDetailEvent();

  return (
    <div className="px-8 md:px-0">
      <Script
        src={environment.MIDTRANS_SNAP_URL}
        data-client-key={environment.MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/event">Event</BreadcrumbItem>
        <BreadcrumbItem>{dataEvent?.name}</BreadcrumbItem>
      </Breadcrumbs>

      <section className="mt-8 flex flex-col gap-10 lg:flex-row">
        <div className="w-full lg:w-4/6">
          {!dataEvent && !dataTicket ? (
            <EventHeaderSkeleton />
          ) : (
            <>
              <h1 className="text-2xl font-semibold text-danger mb-2">
                {dataEvent?.name}
              </h1>

              <div className="mb-2 flex items-center gap-2 text-foreground-500">
                <FaClock width={16} />
                <p>
                  {convertTime(dataEvent?.startDate)} -{" "}
                  {convertTime(dataEvent?.endDate)}
                </p>
              </div>
              <div className="flex items-center gap-2 text-foreground-500">
                <FaLocationArrow width={16} />
                <p>
                  {dataEvent?.isOnline ? "Online" : "Offline"}{" "}
                  {dataEvent?.isOnline
                    ? ""
                    : ` - ${dataEvent?.location?.address}`}
                </p>
              </div>
            </>
          )}
          <Skeleton
            className="my-4 w-full aspect-video rounded-lg"
            isLoaded={!!dataEvent?.banner && !!dataTicket}
          >
            <Image
              alt="cover"
              src={dataEvent?.banner || "/images/placeholder.png"}
              className="aspect-video w-full rounded-lg object-cover"
              width={1920}
              height={1080}
            />
          </Skeleton>
          <Tabs aria-label="Tab Detail Event" fullWidth>
            <Tab key="Description" title="Description">
              {!dataEvent && !dataTicket ? (
                <EventDescriptionSkeleton />
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-foreground-700">
                    About Event
                  </h2>
                  <p className="text-foreground-500">
                    {dataEvent?.description}
                  </p>
                </>
              )}
            </Tab>
            <Tab key="Ticket" title="Ticket">
              <h2 className="text-xl font-semibold text-foreground-700">
                Ticket Information
              </h2>
              {!dataEvent && !dataTicket ? (
                <TicketListSkeleton />
              ) : (
                <div className="mt-2 flex flex-col gap-8">
                  {dataTicket?.map((ticket: ITicketsPayload) => (
                    <DetailEventTicket
                      ticket={ticket}
                      cart={cart}
                      handleAddToCart={() => handleAddToCart(`${ticket._id}`)}
                    />
                  ))}
                </div>
              )}
            </Tab>
          </Tabs>
        </div>
        <div className="w-full lg:w-2/6">
          {!dataEvent && !dataTicket ? (
            <CartSkeleton />
          ) : (
            <DetailEventCart
              cart={cart}
              dataTicketInCart={dataTicketInCart}
              onChangeQuantity={handleChangeQuantity}
              onCreateOrder={handleCreateOrder}
              isLoading={isPendingCreateOrder}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default DetailEvent;
