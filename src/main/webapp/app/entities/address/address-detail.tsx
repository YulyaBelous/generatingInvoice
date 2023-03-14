import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './address.reducer';

export const AddressDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const addressEntity = useAppSelector(state => state.address.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="addressDetailsHeading">
          <Translate contentKey="generatingInvoiceApp.address.detail.title">Address</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{addressEntity.id}</dd>
          <dt>
            <span id="country">
              <Translate contentKey="generatingInvoiceApp.address.country">Country</Translate>
            </span>
          </dt>
          <dd>{addressEntity.country}</dd>
          <dt>
            <span id="province">
              <Translate contentKey="generatingInvoiceApp.address.province">Province</Translate>
            </span>
          </dt>
          <dd>{addressEntity.province}</dd>
          <dt>
            <span id="postCode">
              <Translate contentKey="generatingInvoiceApp.address.postCode">Post Code</Translate>
            </span>
          </dt>
          <dd>{addressEntity.postCode}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="generatingInvoiceApp.address.city">City</Translate>
            </span>
          </dt>
          <dd>{addressEntity.city}</dd>
          <dt>
            <span id="streetLine1">
              <Translate contentKey="generatingInvoiceApp.address.streetLine1">Street Line 1</Translate>
            </span>
          </dt>
          <dd>{addressEntity.streetLine1}</dd>
          <dt>
            <span id="streetLine2">
              <Translate contentKey="generatingInvoiceApp.address.streetLine2">Street Line 2</Translate>
            </span>
          </dt>
          <dd>{addressEntity.streetLine2}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="generatingInvoiceApp.address.email">Email</Translate>
            </span>
          </dt>
          <dd>{addressEntity.email}</dd>
          <dt>
            <span id="phone1">
              <Translate contentKey="generatingInvoiceApp.address.phone1">Phone 1</Translate>
            </span>
          </dt>
          <dd>{addressEntity.phone1}</dd>
          <dt>
            <span id="phone2">
              <Translate contentKey="generatingInvoiceApp.address.phone2">Phone 2</Translate>
            </span>
          </dt>
          <dd>{addressEntity.phone2}</dd>
        </dl>
        <Button tag={Link} to="/address" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/address/${addressEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AddressDetail;
