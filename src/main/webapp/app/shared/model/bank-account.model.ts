import { ISupplier } from 'app/shared/model/supplier.model';

export interface IBankAccount {
  id?: number;
  name?: string | null;
  addressLine?: string | null;
  accountNumber?: string | null;
  bankName?: string | null;
  swift?: string | null;
  correspondentName?: string | null;
  correspondentAddress?: string | null;
  correspondentSwift?: string | null;
  supplier?: ISupplier | null;
}

export const defaultValue: Readonly<IBankAccount> = {};
