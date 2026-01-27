import { DateValue } from "@internationalized/date";
import { DateValue } from "@internationalized/date";
export interface IEvent {
  name: string;
  _id: string;
  slug: string;
  category: string;
  isFeatured: boolean;
  isOnline: boolean;
  description: string;
  startDate: string;
  endDate: string;
  location?: {
    region: number;
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

  startDate?: string;
  endDate?: string;

  location?: {
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

  startDate: ZonedDateTime;
  endDate: ZonedDateTime;
  region: number;
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

  region: number;
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

  startDate: string;
  endDate: string;

  location: {
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
