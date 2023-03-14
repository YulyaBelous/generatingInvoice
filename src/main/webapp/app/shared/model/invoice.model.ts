import dayjs from 'dayjs';
import { ISupplier } from 'app/shared/model/supplier.model';
import { ICustomer } from 'app/shared/model/customer.model';

export interface IInvoice {
  id?: number;
  number?: string | null;
  date?: string | null;
  description?: string | null;
  unitPrice?: number | null;
  quantity?: number | null;
  amount?: number | null;
  supplier?: ISupplier | null;
  customer?: ICustomer | null;
}

export const defaultValue: Readonly<IInvoice> = {};
