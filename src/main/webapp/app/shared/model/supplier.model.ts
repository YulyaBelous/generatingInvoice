import { IAddress } from 'app/shared/model/address.model';
import { IBankAccount } from 'app/shared/model/bank-account.model';
import { IInvoice } from 'app/shared/model/invoice.model';

export interface ISupplier {
  id?: number;
  name?: string | null;
  shortName?: string | null;
  fullName?: string | null;
  taxCode?: string;
  address?: IAddress | null;
  bankAccounts?: IBankAccount[] | null;
  invoices?: IInvoice[] | null;
}

export const defaultValue: Readonly<ISupplier> = {};
