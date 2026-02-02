export interface ITicketsPayload {
  _id?: string;
  price: number;
  name: string;
  description: string;
  events?: string;
  quantity: number;
}

export interface ITicketsUpdatePayload {
  _id?: string;
  price?: number;
  name?: string;
  description?: string;
  events?: string;
  quantity?: number;
}

export interface ITicketsForm {
  _id?: string;
  price?: string;
  name?: string;
  description?: string;
  events?: string;
  quantity?: string;
}

export interface ITicketsUpdate {
  _id?: string;
  price: string;
  name: string;
  description: string;
  events?: string;
  quantity: string;
}
