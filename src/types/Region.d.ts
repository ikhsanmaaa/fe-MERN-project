interface IRegion {
  id: number;
  name: string;
  province?: string;
  regency?: string;
  district?: string;
  village?: string;
}

export type { IRegion };
