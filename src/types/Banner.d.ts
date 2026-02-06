export interface IBannersPayload {
  _id?: string;
  title: string;
  image: string | FileList;
  isShow: boolean;
}

export interface IBannersUpdatePayload {
  _id?: string;
  title?: string;
  image?: string | FileList;
  isShow?: boolean;
}

export interface IBannersForm {
  _id?: string;
  title: string;
  image: string | FileList;
  isShow: "true" | "false";
}

export interface IBannersUpdateInfo {
  _id?: string;
  title: string;
  isShow: "true" | "false";
}

export interface IBannerUpdateIconPayload {
  image?: string | FileList;
}

export interface IBannerUpdateIcon {
  image: string | FileList;
}
