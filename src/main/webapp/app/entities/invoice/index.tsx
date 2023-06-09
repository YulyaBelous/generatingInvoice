import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Invoice from './invoice';
import InvoiceDetail from './invoice-detail';
import InvoiceUpdate from './invoice-update';
import InvoiceDeleteDialog from './invoice-delete-dialog';
import InvoiceReport from 'app/entities/invoice/invoice-report';

const InvoiceRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Invoice />} />
    <Route path="new" element={<InvoiceUpdate />} />
    <Route path=":id">
      <Route index element={<InvoiceDetail />} />
      <Route path="edit" element={<InvoiceUpdate />} />
      <Route path="delete" element={<InvoiceDeleteDialog />} />
      <Route path="report" element={<InvoiceReport />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default InvoiceRoutes;
