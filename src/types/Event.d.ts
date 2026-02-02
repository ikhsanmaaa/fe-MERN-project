import { DateValue } from "@internationalized/date";
import { DateValue } from "@internationalized/date";
export interface IEvent {
  name: string;
  _id: string;
  slug: string;
  category: string;
  isFeatured: boolean;
  isOnline: boolean;
  isPublish: boolean;
  description: string;
  startDate: string;
  endDate: string;
  location?: {
    address: string;
    region: string;
    coordinates: number[];
  };
  banner: string | FileList;
}

export interface IEventUpdateInfoPayload {
  name?: string;
  _id?: string;
  slug?: string;
  category?: string;
  description?: string;

  isOnline?: boolean;
  isFeatured?: boolean;
  isPublish?: boolean;
  startDate?: string;
  endDate?: string;

  location?: {
    address: string;
    region: number;
    coordinates: number[];
  };
}

export interface IEventUpdateInfoForm {
  name: string;
  _id?: string;
  slug: string;
  category: string;

  description: string;

  isOnline: "true" | "false";
  isFeatured: "true" | "false";
  isPublish: "true" | "false";

  startDate: ZonedDateTime;
  endDate: ZonedDateTime;

  address: string;
  region: string;
  latitude: string;
  longitude: string;
}

export interface IEventCreateForm {
  name: string;
  slug: string;
  category: string;
  description: string;

  startDate: ZonedDateTime;
  endDate: ZonedDateTime;

  isOnline: "true" | "false";
  isFeatured: "true" | "false";
  isPublish: "true" | "false";

  address: string;
  region: string;
  latitude: string;
  longitude: string;

  banner: FileList | string;
}

export interface IEventCreatePayload {
  name: string;
  _id?: string;
  slug: string;
  category: string;
  description: string;

  isOnline: boolean;
  isFeatured: boolean;
  isPublish: boolean;

  startDate: string;
  endDate: string;

  location: {
    address: string;
    region: number;
    coordinates: number[];
  };

  banner: File | string;
}

export interface IEventUpdateBannerPayload {
  banner: File;
}

export interface IEventBannerForm {
  banner: FileList;
}
