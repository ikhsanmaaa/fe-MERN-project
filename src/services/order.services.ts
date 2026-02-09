import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICart } from "@/types/Ticket";

const OrderServices = {
  createOrder: (payload: ICart) => instance.post(endpoint.ORDER, payload),
};

export default OrderServices;
