export interface IAddress {
  id?: number;
  country?: string | null;
  province?: string | null;
  postCode?: string | null;
  city?: string | null;
  streetLine1?: string | null;
  streetLine2?: string | null;
  email?: string | null;
  phone1?: string | null;
  phone2?: string | null;
}

export const defaultValue: Readonly<IAddress> = {};
