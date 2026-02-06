"use client";
import { Skeleton } from "@heroui/react";
import HomeSlider from "../HomeSlider/HomeSlider";
import useHome from "./useHome";
import Image from "next/image";
import HomeEventList from "./HomeEventList/HomeEventList";
import HomeCategoryList from "./HomeCategory/HomeCategory";

const Home = () => {
  const {
    dataBannerPage,
    isLoadingBannerPage,

    dataEventHomePage,
    isLoadingEventHomePage,

    dataFeaturedEventPage,
    isLoadingFeaturedEventPage,

    dataCategoriesPage,
    isLoadingCategoriesPage,
  } = useHome();

  return (
    <div>
      <HomeSlider
        isLoadingBanner={isLoadingBannerPage}
        banners={dataBannerPage?.data}
      />
      <HomeEventList
        title="Featured Event"
        events={dataFeaturedEventPage}
        isLoading={isLoadingFeaturedEventPage}
      />
      <Skeleton
        isLoaded={!isLoadingBannerPage}
        className="mb-16 h-[20vw] w-full rounded-2xl"
      >
        <Image
          src={dataBannerPage && dataBannerPage?.data[1]?.image}
          alt="banner"
          className="h-[20vw] px-6 lg:px-0 w-full rounded-2xl object-cover object-center"
          width={1920}
          height={800}
        />
      </Skeleton>
      <HomeEventList
        title="Latest Event"
        events={dataEventHomePage}
        isLoading={isLoadingEventHomePage}
      />
      <HomeCategoryList
        Categories={dataCategoriesPage?.data}
        isLoading={isLoadingCategoriesPage}
      />
    </div>
  );
};

export default Home;
