import { DateValue } from "@heroui/react";

interface IEvent {
  name: string;
  slug: string;
  category: string;
  description: string;
  startDate: DateValue;
  endDate: DateValue;
  isPublished: string;
  isFeatured: string;
  isOnline: string;
  region: string;
  banner: FileList | string;
}

export type { IEvent };
