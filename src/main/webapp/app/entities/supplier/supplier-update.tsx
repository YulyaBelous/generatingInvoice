import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAddress } from 'app/shared/model/address.model';
import { getEntities as getAddresses } from 'app/entities/address/address.reducer';
import { getEntities as getBankAccounts } from 'app/entities/bank-account/bank-account.reducer';
import { ISupplier } from 'app/shared/model/supplier.model';
import { getEntity, updateEntity, createEntity, reset } from './supplier.reducer';

export const SupplierUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const addresses = useAppSelector(state => state.address.entities);
  const supplierEntity = useAppSelector(state => state.supplier.entity);
  const loading = useAppSelector(state => state.supplier.loading);
  const updating = useAppSelector(state => state.supplier.updating);
  const updateSuccess = useAppSelector(state => state.supplier.updateSuccess);

  const handleClose = () => {
    navigate('/supplier');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAddresses({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...supplierEntity,
      ...values,
      address: addresses.find(it => it.id.toString() === values.address.toString()),
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
          ...supplierEntity,
          address: supplierEntity?.address?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="generatingInvoiceApp.supplier.home.createOrEditLabel" data-cy="SupplierCreateUpdateHeading">
            <Translate contentKey="generatingInvoiceApp.supplier.home.createOrEditLabel">Create or edit a Supplier</Translate>
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
                  id="supplier-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('generatingInvoiceApp.supplier.name')}
                id="supplier-name"
                name="name"
                data-cy="name"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.supplier.shortName')}
                id="supplier-shortName"
                name="shortName"
                data-cy="shortName"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.supplier.fullName')}
                id="supplier-fullName"
                name="fullName"
                data-cy="fullName"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.supplier.taxCode')}
                id="supplier-taxCode"
                name="taxCode"
                data-cy="taxCode"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                id="supplier-address"
                name="address"
                data-cy="address"
                label={translate('generatingInvoiceApp.supplier.address')}
                type="select"
              >
                <option value="" key="0" />
                {addresses
                  ? addresses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/supplier" replace color="info">
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

export default SupplierUpdate;
