"use client";

import bannerServices from "@/services/banner.services";

import {
  LIMIT_BANNER,
  LIMIT_CATEGORY,
  LIMIT_EVENT,
  PAGE_DEFAULT,
} from "@/constants/list.constants";
import { useQuery } from "@tanstack/react-query";
import eventServices from "@/services/events.services";
import categoryServices from "@/services/category.services";

const useHome = () => {
  const getBanner = async () => {
    let params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`;
    const res = await bannerServices.getBanner(params);
    const { data } = res;

    return data;
  };

  const { data: dataBannerPage, isLoading: isLoadingBannerPage } = useQuery({
    queryKey: ["Banner"],
    queryFn: getBanner,
  });

  const currentEventQuery = `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublished=true`;

  const getEventsHomePage = async (params: string) => {
    const res = await eventServices.getEvents(params);

    return res.data.data;
  };

  const { data: dataEventHomePage, isLoading: isLoadingEventHomePage } =
    useQuery({
      queryKey: ["EventHomePage"],
      queryFn: () => getEventsHomePage(`${currentEventQuery}`),
    });

  const { data: dataFeaturedEventPage, isLoading: isLoadingFeaturedEventPage } =
    useQuery({
      queryKey: ["FeaturedEvent"],
      queryFn: () => getEventsHomePage(`${currentEventQuery}&isFeatured=true`),
    });

  const getCategories = async () => {
    let params = `limit=${LIMIT_CATEGORY}&page=${PAGE_DEFAULT}`;
    const res = await categoryServices.getCategories(params);
    const { data } = res;

    return data;
  };

  const { data: dataCategoriesPage, isLoading: isLoadingCategoriesPage } =
    useQuery({
      queryKey: ["Categories"],
      queryFn: getCategories,
    });

  return {
    dataBannerPage,
    isLoadingBannerPage,

    dataEventHomePage,
    isLoadingEventHomePage,

    dataFeaturedEventPage,
    isLoadingFeaturedEventPage,

    dataCategoriesPage,
    isLoadingCategoriesPage,
  };
};

export default useHome;
