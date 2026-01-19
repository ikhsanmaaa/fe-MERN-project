import { Metadata } from "next";
import PageHeader from "@/ui/PageHeader/PageHeader";
import Event from "./event";
export const metadata: Metadata = {
  title: "Event",
  description: "List of all Event",
};
const EventPage = () => {
  return (
    <>
      <PageHeader
        title="Event"
        description="List of all Event, create new event, and manage existing event"
      />
      <Event />
    </>
  );
};

export default EventPage;
