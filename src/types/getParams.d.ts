interface GetParams {
  page: number;
  limit: number;
  search?: string;
}

interface GetParamsExplorePage extends GetParams {
  category?: string;
  isOnline?: string;
  isFeatured?: string;
}

export type { GetParams, GetParamsExplorePage };
