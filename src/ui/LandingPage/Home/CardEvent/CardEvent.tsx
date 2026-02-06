import { IEvent } from "@/types/Event";
import { cn } from "@/utils/cn";
import { convertTime } from "@/utils/date";
import { Card, CardBody, CardFooter } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

interface PropTypes {
  event: IEvent;
  className?: string;
  key?: string;
}

const CardEvent = (props: PropTypes) => {
  const { event, className, key } = props;
  return (
    <Card
      key={key}
      isPressable
      as={Link}
      href={`/event/${event.slug}`}
      className={cn(className, "cursor-pointer")}
    >
      <CardBody>
        <Image
          alt="cover"
          src={`${event?.banner}`}
          width={1920}
          height={1080}
          className="aspect-video w-full rounded-lg object-cover"
        />
      </CardBody>
      <CardFooter className="flex-col items-center pt-0 text-left">
        <h2 className="line-clamp-1 w-full text-lg font-bold text-danger">
          {event.name}
        </h2>
        <p className="mb-2 line-clamp-2 w-full">{event.description}</p>
        <p className="text-foreground-500 w-full">
          {convertTime(`${event.startDate}`)}
        </p>
      </CardFooter>
    </Card>
  );
};

export default CardEvent;
