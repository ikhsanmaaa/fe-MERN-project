import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";

const CoverTabSkeleton = () => {
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center gap-2">
        <Skeleton className="h-6 w-40 rounded-md" />
        <Skeleton className="h-4 w-64 rounded-md" />
      </CardHeader>

      <CardBody>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-28 rounded-md" />

          <Skeleton className="h-56 w-full rounded-lg" />

          <Skeleton className="h-36 w-full rounded-lg" />

          <Skeleton className="h-10 w-40 rounded-lg mt-2" />
        </div>
      </CardBody>
    </Card>
  );
};

export default CoverTabSkeleton;
