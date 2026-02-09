import { Skeleton } from "@heroui/react";

const EventHeaderSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-8 w-3/4 rounded-lg" />
    <Skeleton className="h-4 w-1/2 rounded-lg" />
    <Skeleton className="h-4 w-2/3 rounded-lg" />
  </div>
);

const EventBannerSkeleton = () => (
  <Skeleton className="my-4 w-full aspect-video rounded-lg" />
);

const EventDescriptionSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-6 w-40 rounded-lg" />
    <Skeleton className="h-4 w-full rounded-lg" />
    <Skeleton className="h-4 w-11/12 rounded-lg" />
    <Skeleton className="h-4 w-10/12 rounded-lg" />
  </div>
);

const TicketItemSkeleton = () => (
  <div className="rounded-xl border p-4 space-y-3">
    <Skeleton className="h-6 w-1/3 rounded-lg" />
    <Skeleton className="h-4 w-full rounded-lg" />
    <Skeleton className="h-4 w-5/6 rounded-lg" />
    <Skeleton className="h-10 w-32 rounded-lg" />
  </div>
);

const TicketListSkeleton = () => (
  <div className="mt-2 flex flex-col gap-8">
    {[1, 2, 3].map((i) => (
      <TicketItemSkeleton key={i} />
    ))}
  </div>
);

const CartSkeleton = () => (
  <div className="rounded-xl border p-4 space-y-4">
    <Skeleton className="h-6 w-1/2 rounded-lg" />

    {[1, 2].map((i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="h-4 w-3/4 rounded-lg" />
        <Skeleton className="h-8 w-full rounded-lg" />
      </div>
    ))}

    <Skeleton className="h-10 w-full rounded-lg" />
  </div>
);

export {
  EventBannerSkeleton,
  EventDescriptionSkeleton,
  TicketItemSkeleton,
  TicketListSkeleton,
  EventHeaderSkeleton,
  CartSkeleton,
};
