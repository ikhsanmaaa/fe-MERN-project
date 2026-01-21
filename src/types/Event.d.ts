import { DateValue } from "@internationalized/date";

interface IEvent {
  name: string;
  slug: string;
  category: string;
  isFeatured: boolean;
  isOnline: boolean;
  description: string;
  startDate: string;
  endDate: string;
  location?: {
    region: string;
    coordinates: number[];
  };
  banner: string | FileList;
}

import { DateValue } from "@internationalized/date";

interface IEventForm {
  name: string;
  slug: string;
  category: string;
  description: string;

  isFeatured: "true" | "false";
  isOnline: "true" | "false";

  startDate: ZonedDateTime;
  endDate: ZonedDateTime;

  region: string;
  banner: string | FileList;
  latitude: string;
  longitude: string;
}

export type { IEvent, IEventForm };
