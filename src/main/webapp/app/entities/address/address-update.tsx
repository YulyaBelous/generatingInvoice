import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAddress } from 'app/shared/model/address.model';
import { getEntity, updateEntity, createEntity, reset } from './address.reducer';

export const AddressUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const addressEntity = useAppSelector(state => state.address.entity);
  const loading = useAppSelector(state => state.address.loading);
  const updating = useAppSelector(state => state.address.updating);
  const updateSuccess = useAppSelector(state => state.address.updateSuccess);

  const handleClose = () => {
    navigate('/address');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...addressEntity,
      ...values,
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
          ...addressEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="generatingInvoiceApp.address.home.createOrEditLabel" data-cy="AddressCreateUpdateHeading">
            <Translate contentKey="generatingInvoiceApp.address.home.createOrEditLabel">Create or edit a Address</Translate>
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
                  id="address-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('generatingInvoiceApp.address.country')}
                id="address-country"
                name="country"
                data-cy="country"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.address.province')}
                id="address-province"
                name="province"
                data-cy="province"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.address.postCode')}
                id="address-postCode"
                name="postCode"
                data-cy="postCode"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.address.city')}
                id="address-city"
                name="city"
                data-cy="city"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.address.streetLine1')}
                id="address-streetLine1"
                name="streetLine1"
                data-cy="streetLine1"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.address.streetLine2')}
                id="address-streetLine2"
                name="streetLine2"
                data-cy="streetLine2"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.address.email')}
                id="address-email"
                name="email"
                data-cy="email"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.address.phone1')}
                id="address-phone1"
                name="phone1"
                data-cy="phone1"
                type="text"
              />
              <ValidatedField
                label={translate('generatingInvoiceApp.address.phone2')}
                id="address-phone2"
                name="phone2"
                data-cy="phone2"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/address" replace color="info">
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

export default AddressUpdate;
