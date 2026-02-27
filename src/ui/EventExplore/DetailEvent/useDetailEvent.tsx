"use client";

import eventServices from "@/services/events.services";
import ticketsServices from "@/services/tickets.services";
import { ICart, ITicketsPayload } from "@/types/Ticket";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { defaultCart } from "../DetailEventTicket/DetailEventTicket.constant";
import OrderServices from "@/services/order.services";
import { addToast } from "@heroui/react";

const useDetailEvent = () => {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const getEventBySlug = async (slug: string) => {
    const { data } = await eventServices.getEventBySlug(slug);
    return data.data;
  };

  const { data: dataEvent } = useQuery({
    queryKey: ["Event", slug],
    queryFn: () => getEventBySlug(slug),
    enabled: !!slug,
  });

  const getTicketByEventId = async () => {
    const { data } = await ticketsServices.getTicketsByEventId(
      `${dataEvent._id}`,
    );
    return data.data;
  };

  const { data: dataTicket } = useQuery({
    queryKey: ["Tickets"],
    queryFn: getTicketByEventId,
    enabled: !!dataEvent?._id,
  });

  const [cart, setCart] = useState<ICart>(defaultCart);

  const dataTicketInCart = useMemo(() => {
    if (dataTicket) {
      return dataTicket.find(
        (ticket: ITicketsPayload) => ticket._id === cart.ticket,
      );
    }
    return null;
  }, [dataTicket, cart]);

  const handleAddToCart = (ticket: string) => {
    setCart({
      events: dataEvent._id as string,
      ticket,
      quantity: 1,
    });
  };

  const handleChangeQuantity = (type: "increment" | "decrement") => {
    if (type === "increment") {
      if (cart.quantity < dataTicketInCart?.quantity) {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity + 1,
        }));
      }
    } else {
      if (cart.quantity < 1) {
        setCart(defaultCart);
      } else {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity - 1,
        }));
      }
    }
  };

  const createOrder = async (payload: ICart) => {
    const result = await OrderServices.createOrder({
      ...payload,
      origin: window.location.origin,
    });
    const { data } = result;
    return data.data;
  };

  const { mutate: mutateCreateOrder, isPending: isPendingCreateOrder } =
    useMutation({
      mutationFn: createOrder,
      onError: (error) => {
        addToast({
          title: "error",
          description: error.message,
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      },
      onSuccess: (result) => {
        const transactionToken = result.payment.token;
        (window as any).snap.pay(transactionToken);
      },
    });

  const handleCreateOrder = () => {
    mutateCreateOrder(cart);
  };

  return {
    cart,
    setCart,

    dataTicketInCart,

    dataEvent,

    dataTicket,

    handleAddToCart,
    handleChangeQuantity,

    handleCreateOrder,
    isPendingCreateOrder,
  };
};

export default useDetailEvent;
