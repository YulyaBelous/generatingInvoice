import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IInvoice } from 'app/shared/model/invoice.model';
import { getEntities } from './invoice.reducer';

export const Invoice = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const invoiceList = useAppSelector(state => state.invoice.entities);
  const loading = useAppSelector(state => state.invoice.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="invoice-heading" data-cy="InvoiceHeading">
        <Translate contentKey="generatingInvoiceApp.invoice.home.title">Invoices</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="generatingInvoiceApp.invoice.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/invoice/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="generatingInvoiceApp.invoice.home.createLabel">Create new Invoice</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {invoiceList && invoiceList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="generatingInvoiceApp.invoice.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="generatingInvoiceApp.invoice.number">Number</Translate>
                </th>
                <th>
                  <Translate contentKey="generatingInvoiceApp.invoice.date">Date</Translate>
                </th>
                <th>
                  <Translate contentKey="generatingInvoiceApp.invoice.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="generatingInvoiceApp.invoice.unitPrice">Unit Price</Translate>
                </th>
                <th>
                  <Translate contentKey="generatingInvoiceApp.invoice.quantity">Quantity</Translate>
                </th>
                <th>
                  <Translate contentKey="generatingInvoiceApp.invoice.amount">Amount</Translate>
                </th>
                <th>
                  <Translate contentKey="generatingInvoiceApp.invoice.supplier">Supplier</Translate>
                </th>
                <th>
                  <Translate contentKey="generatingInvoiceApp.invoice.customer">Customer</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {invoiceList.map((invoice, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/invoice/${invoice.id}`} color="link" size="sm">
                      {invoice.id}
                    </Button>
                  </td>
                  <td>{invoice.number}</td>
                  <td>{invoice.date ? <TextFormat type="date" value={invoice.date} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{invoice.description}</td>
                  <td>{invoice.unitPrice}</td>
                  <td>{invoice.quantity}</td>
                  <td>{invoice.amount}</td>
                  <td>{invoice.supplier ? <Link to={`/supplier/${invoice.supplier.id}`}>{invoice.supplier.id}</Link> : ''}</td>
                  <td>{invoice.customer ? <Link to={`/customer/${invoice.customer.id}`}>{invoice.customer.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/invoice/${invoice.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/invoice/${invoice.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/invoice/${invoice.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/invoice/${invoice.id}/report`} color="secondary" size="sm" data-cy="entityReportButton">
                        <FontAwesomeIcon icon="book" /> <span className="d-none d-md-inline">PDF</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="generatingInvoiceApp.invoice.home.notFound">No Invoices found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Invoice;
