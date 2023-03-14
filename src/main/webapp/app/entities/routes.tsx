import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Supplier from './supplier';
import Customer from './customer';
import Invoice from './invoice';
import Address from './address';
import BankAccount from './bank-account';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="supplier/*" element={<Supplier />} />
        <Route path="customer/*" element={<Customer />} />
        <Route path="invoice/*" element={<Invoice />} />
        <Route path="address/*" element={<Address />} />
        <Route path="bank-account/*" element={<BankAccount />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
