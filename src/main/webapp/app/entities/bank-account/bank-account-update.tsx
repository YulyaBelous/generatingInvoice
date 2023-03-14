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
import { IBankAccount } from 'app/shared/model/bank-account.model';
import { getEntity, updateEntity, createEntity, reset } from './bank-account.reducer';

export const BankAccountUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const suppliers = useAppSelector(state => state.supplier.entities);
  const bankAccountEntity = useAppSelector(state => state.bankAccount.entity);
  const loading = useAppSelector(state => state.bankAccount.loading);
  const updating = useAppSelector(state => state.bankAccount.updating);
  const updateSuccess = useAppSelector(state => state.bankAccount.updateSuccess);

  const handleClose = () => {
    navigate('/bank-account');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getSuppliers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...bankAccountEntity,
      ...values,
      supplier: suppliers.find(it => it.id.toString() === values.supplier.toString()),
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
          ...bankAccountEntity,
          supplier: bankAccountEntity?.supplier?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="generatingInvoiceApp.bankAccount.home.createOrEditLabel" data-cy="BankAccountCreateUpdateHeading">
            <Translate contentKey="generatingInvoiceApp.bankAccount.home.createOrEditLabel">Create or edit a BankAccount</Translate>
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
                  id="bank-account-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('generatingInvoiceApp.bankAccount.name')}
                id="bank-account-name"
                name="name"
                data-cy="name"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.bankAccount.addressLine')}
                id="bank-account-addressLine"
                name="addressLine"
                data-cy="addressLine"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.bankAccount.accountNumber')}
                id="bank-account-accountNumber"
                name="accountNumber"
                data-cy="accountNumber"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.bankAccount.bankName')}
                id="bank-account-bankName"
                name="bankName"
                data-cy="bankName"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.bankAccount.swift')}
                id="bank-account-swift"
                name="swift"
                data-cy="swift"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.bankAccount.correspondentName')}
                id="bank-account-correspondentName"
                name="correspondentName"
                data-cy="correspondentName"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.bankAccount.correspondentAddress')}
                id="bank-account-correspondentAddress"
                name="correspondentAddress"
                data-cy="correspondentAddress"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.bankAccount.correspondentSwift')}
                id="bank-account-correspondentSwift"
                name="correspondentSwift"
                data-cy="correspondentSwift"
                type="text"
              />
              <ValidatedField
                id="bank-account-supplier"
                name="supplier"
                data-cy="supplier"
                label={translate('generatingInvoiceApp.bankAccount.supplier')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/bank-account" replace color="info">
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

export default BankAccountUpdate;
