import { ICategory } from "@/types/Category";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

interface PropTypes {
  Categories: ICategory[];
  isLoading: boolean;
}

const HomeCategoryList = (props: PropTypes) => {
  const { Categories, isLoading } = props;
  return (
    <Card className="mx-6 mb-8 p-8 lg:mx-0">
      <CardHeader className="p-0">
        <h1 className="text-2xl font-bold text-danger">Event By Category</h1>
      </CardHeader>
      <CardBody className="mt-4 p-0">
        <div
          className=" grid grid-cols-1 gap-4
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4"
        >
          {!isLoading && Categories
            ? Categories?.map((category) => (
                <Link
                  key={`category-${category._id}`}
                  href={`/event?category=${category._id}`}
                  className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-4"
                >
                  <Image
                    src={`${category.icon}`}
                    alt={`category-${category.name}`}
                    width={1920}
                    height={600}
                    className="1/2"
                  />

                  <p className="text-md font-bold">{category.name}</p>
                </Link>
              ))
            : Array.from({ length: 8 }).map((_, i) => (
                <Skeleton
                  key={`list-category-skeleton-${i}`}
                  className="aspect-square rounded-xl"
                />
              ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default HomeCategoryList;
