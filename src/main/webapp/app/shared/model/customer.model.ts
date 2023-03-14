import { IAddress } from 'app/shared/model/address.model';
import { IInvoice } from 'app/shared/model/invoice.model';

export interface ICustomer {
  id?: number;
  name?: string | null;
  shortName?: string | null;
  fullName?: string | null;
  taxCode?: string;
  address?: IAddress | null;
  invoices?: IInvoice[] | null;
}

export const defaultValue: Readonly<ICustomer> = {};
