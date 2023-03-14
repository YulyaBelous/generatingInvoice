import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISupplier } from 'app/shared/model/supplier.model';
import { getEntities } from './supplier.reducer';

export const Supplier = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const supplierList = useAppSelector(state => state.supplier.entities);
  const loading = useAppSelector(state => state.supplier.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="supplier-heading" data-cy="SupplierHeading">
        <Translate contentKey="generatingInvoiceApp.supplier.home.title">Suppliers</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="generatingInvoiceApp.supplier.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/supplier/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="generatingInvoiceApp.supplier.home.createLabel">Create new Supplier</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {supplierList && supplierList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="generatingInvoiceApp.supplier.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="generatingInvoiceApp.supplier.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="generatingInvoiceApp.supplier.shortName">Short Name</Translate>
                </th>
                <th>
                  <Translate contentKey="generatingInvoiceApp.supplier.fullName">Full Name</Translate>
                </th>
                <th>
                  <Translate contentKey="generatingInvoiceApp.supplier.taxCode">Tax Code</Translate>
                </th>
                <th>
                  <Translate contentKey="generatingInvoiceApp.supplier.address">Address</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {supplierList.map((supplier, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/supplier/${supplier.id}`} color="link" size="sm">
                      {supplier.id}
                    </Button>
                  </td>
                  <td>{supplier.name}</td>
                  <td>{supplier.shortName}</td>
                  <td>{supplier.fullName}</td>
                  <td>{supplier.taxCode}</td>
                  <td>{supplier.address ? <Link to={`/address/${supplier.address.id}`}>{supplier.address.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/supplier/${supplier.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/supplier/${supplier.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/supplier/${supplier.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
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
              <Translate contentKey="generatingInvoiceApp.supplier.home.notFound">No Suppliers found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Supplier;
