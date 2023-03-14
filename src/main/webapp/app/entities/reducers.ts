import supplier from 'app/entities/supplier/supplier.reducer';
import customer from 'app/entities/customer/customer.reducer';
import invoice from 'app/entities/invoice/invoice.reducer';
import address from 'app/entities/address/address.reducer';
import bankAccount from 'app/entities/bank-account/bank-account.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  supplier,
  customer,
  invoice,
  address,
  bankAccount,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
