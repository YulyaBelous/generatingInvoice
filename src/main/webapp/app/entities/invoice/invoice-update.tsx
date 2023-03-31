import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISupplier } from 'app/shared/model/supplier.model';
import { getEntities as getSuppliers } from 'app/entities/supplier/supplier.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { IInvoice } from 'app/shared/model/invoice.model';
import { getEntity, updateEntity, createEntity, reset } from './invoice.reducer';
import { getEntities as getBankAccounts } from 'app/entities/bank-account/bank-account.reducer';

export const InvoiceUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const suppliers = useAppSelector(state => state.supplier.entities);
  const customers = useAppSelector(state => state.customer.entities);
  const bankAccounts = useAppSelector(state => state.bankAccount.entities);
  const invoiceEntity = useAppSelector(state => state.invoice.entity);
  const loading = useAppSelector(state => state.invoice.loading);
  const updating = useAppSelector(state => state.invoice.updating);
  const updateSuccess = useAppSelector(state => state.invoice.updateSuccess);

  const handleClose = () => {
    navigate('/invoice');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getSuppliers({}));
    dispatch(getCustomers({}));
    dispatch(getBankAccounts({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...invoiceEntity,
      ...values,
      supplier: suppliers.find(it => it.id.toString() === values.supplier.toString()),
      customer: customers.find(it => it.id.toString() === values.customer.toString()),
      bankAccount: bankAccounts.find(it => it.id.toString() === values.bankAccount.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...invoiceEntity,
          supplier: invoiceEntity?.supplier?.id,
          customer: invoiceEntity?.customer?.id,
          bankAccount: invoiceEntity?.bankAccount?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="generatingInvoiceApp.invoice.home.createOrEditLabel" data-cy="InvoiceCreateUpdateHeading">
            <Translate contentKey="generatingInvoiceApp.invoice.home.createOrEditLabel">Create or edit a Invoice</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="invoice-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('generatingInvoiceApp.invoice.number')}
                id="invoice-number"
                name="number"
                data-cy="number"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.invoice.date')}
                id="invoice-date"
                name="date"
                data-cy="date"
                type="date"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.invoice.description')}
                id="invoice-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.invoice.unitPrice')}
                id="invoice-unitPrice"
                name="unitPrice"
                data-cy="unitPrice"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.invoice.quantity')}
                id="invoice-quantity"
                name="quantity"
                data-cy="quantity"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.invoice.amount')}
                id="invoice-amount"
                name="amount"
                data-cy="amount"
                type="text"
              />
              <ValidatedField
                id="invoice-supplier"
                name="supplier"
                data-cy="supplier"
                label={translate('generatingInvoiceApp.invoice.supplier')}
                type="select"
              >
                <option value="" key="0" />
                {suppliers
                  ? suppliers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="invoice-customer"
                name="customer"
                data-cy="customer"
                label={translate('generatingInvoiceApp.invoice.customer')}
                type="select"
              >
                <option value="" key="0" />
                {customers
                  ? customers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="invoice-bank-account"
                name="bankAccount"
                data-cy="bankAccount"
                label={translate('generatingInvoiceApp.supplier.bankAccount')}
                type="select"
              >
                <option value="" key="0" />
                {bankAccounts
                  ? bankAccounts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/invoice" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default InvoiceUpdate;
